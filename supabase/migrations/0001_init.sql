-- 설비고 MVP 스키마 v0.1 — 목업 스켈레톤의 데이터 계약(lib/mock-data.ts)을 Postgres 로 승격
-- 사업계획서의 공정 DB 6계층(공사유형·증상태그·건물속성·공정단계·가격구성·가산요인)에 정렬
-- 적용: Supabase 대시보드 SQL Editor 에 붙여넣거나 `supabase db push`

-- ============ 1. 공사유형 (서비스 카탈로그) ============
create table if not exists services (
  id text primary key,                       -- 'leak-repair' 등
  name text not null,
  description text,
  entry_path text not null,                  -- 사진진단|현장실측|관로조사|드론점검|즉시확정가|하이브리드
  icon text, icon_bg text,
  sort_order int default 0
);

-- ============ 2. 사업자 ============
create table if not exists pros (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  business_no text,                          -- 사업자등록번호
  rating numeric(2,1) default 0,
  review_count int default 0,
  film_count int default 0,                  -- 필모그래피 건수
  redo_rate numeric(4,1) default 0,          -- 재시공률 %
  response_time_min int,                     -- 평균 응답(분)
  certified boolean default false,           -- 설비고 인증
  created_at timestamptz default now()
);

-- ============ 3. 진단 요청 (증상태그 + 건물속성) ============
create table if not exists requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  service_id text references services(id),
  symptoms text[] not null default '{}',     -- 증상 태그
  address text not null,
  building jsonb not null default '{}',      -- {year, heating, pipe_material, area_sqm, floor}
  photos text[] default '{}',                -- Storage 경로
  status text not null default 'submitted'
    check (status in ('submitted','analyzing','diagnosed','quoted','booked','done','cancelled')),
  created_at timestamptz default now()
);

-- ============ 4. 진단 결과 ============
create table if not exists diagnoses (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references requests(id) on delete cascade,
  case_no text unique not null,
  title text not null,
  defect_type text not null,                 -- 하자 유형
  description text,
  urgency text not null check (urgency in ('normal','watch','caution','urgent')),
  urgency_label text,
  confidence jsonb not null default '[]',    -- [{label, pct, main}]
  price_min_man int, fair_min_man int, fair_max_man int,
  price_mid_man int, price_max_man int,      -- 기준가 (만원)
  matched_cases int default 0,
  price_items jsonb default '[]',            -- 가격구성: [{name, range}]
  reviewed_by text,                          -- 전문가 검수자
  created_at timestamptz default now()
);

-- ============ 5. 견적 (가격구성 포함) ============
create table if not exists quotes (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references requests(id) on delete cascade,
  pro_id uuid not null references pros(id),
  price_won int not null,
  line_items jsonb not null default '[]',    -- 가격구성: [{name, won}]
  badges jsonb default '[]',
  recommended boolean default false,
  warning text,                              -- 적정 구간 이탈 사유
  created_at timestamptz default now()
);

-- ============ 6. 예약·결제 (에스크로) ============
create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid not null references quotes(id),
  user_id uuid references auth.users(id),
  visit_day text not null,
  visit_time text not null,
  method text not null default 'card' check (method in ('card','transfer','insurance')),
  amount_won int not null,                   -- 에스크로 예치액
  status text not null default 'escrow'
    check (status in ('escrow','in_progress','await_approval','paid_out','refunded','cancelled')),
  created_at timestamptz default now()
);

-- ============ 7. 현장 변수 가산요인 ============
create table if not exists variation_items (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references bookings(id) on delete cascade,
  name text not null,
  amount_won int not null,
  reason text,
  standard_range text,                       -- 플랫폼 표준 단가 문자열
  evidence_photos text[] default '{}',       -- 근거 사진 (첨부 의무)
  applicable boolean default true,
  approved boolean,                          -- null=대기, true=승인, false=거절
  decided_at timestamptz
);

-- ============ 8. 시공 사례 (공정단계 요약 포함) ============
create table if not exists similar_cases (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  process_summary text,                      -- 공정단계 요약
  pro_id uuid references pros(id),
  price_won int not null,
  complex_name text, built_year int, floor int,
  defect_type text,
  insurance boolean default false,
  restore_included boolean default false,
  duration_hours numeric(4,1),
  tone text default 'wet',
  created_at timestamptz default now()
);

-- ============ 9. 공동구매 ============
create table if not exists groupbuy_campaigns (
  id uuid primary key default gen_random_uuid(),
  service_id text references services(id),
  complex_name text not null,
  goal_households int not null,
  indiv_price_won int not null,
  tiers jsonb not null default '[]',         -- [{from, to, won, label}]
  deadline date,
  work_date date,
  status text default 'open' check (status in ('open','confirmed','done','cancelled'))
);

create table if not exists groupbuy_participants (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references groupbuy_campaigns(id) on delete cascade,
  user_id uuid references auth.users(id),
  floor_band text,
  joined_at timestamptz default now(),
  unique (campaign_id, user_id)
);

-- ============ RLS ============
alter table services enable row level security;
alter table pros enable row level security;
alter table requests enable row level security;
alter table diagnoses enable row level security;
alter table quotes enable row level security;
alter table bookings enable row level security;
alter table variation_items enable row level security;
alter table similar_cases enable row level security;
alter table groupbuy_campaigns enable row level security;
alter table groupbuy_participants enable row level security;

-- 공개 카탈로그: 누구나 읽기
create policy "services_public_read" on services for select using (true);
create policy "pros_public_read" on pros for select using (true);
create policy "cases_public_read" on similar_cases for select using (true);
create policy "gb_campaign_public_read" on groupbuy_campaigns for select using (true);

-- 내 요청/예약: 소유자만 (사업자·백오피스 정책은 role claim 도입 시 추가)
create policy "requests_owner" on requests
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "diagnoses_owner_read" on diagnoses for select
  using (exists (select 1 from requests r where r.id = request_id and r.user_id = auth.uid()));
create policy "quotes_owner_read" on quotes for select
  using (exists (select 1 from requests r where r.id = request_id and r.user_id = auth.uid()));
create policy "bookings_owner" on bookings
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "variations_owner" on variation_items
  for all using (exists (select 1 from bookings b where b.id = booking_id and b.user_id = auth.uid()));
create policy "gb_join_owner" on groupbuy_participants
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
