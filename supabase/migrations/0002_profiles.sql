-- 0002 — Auth 프로필·역할 (Phase 2 준비, 2026-08-04)
-- auth.users 가입 시 profiles 행 자동 생성. 역할 4종: consumer / pro / manager / insurer.
-- 사업자·관리사무소는 가입 후 운영자가 role 을 승격시키는 승인제 (기본값 consumer).

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'consumer'
    check (role in ('consumer', 'pro', 'manager', 'insurer')),
  display_name text,
  phone text,
  created_at timestamptz default now()
);

alter table profiles enable row level security;

-- 본인 프로필 조회·수정 (role 은 본인이 못 바꾸도록 컬럼 제한은 API 계층에서 — service role 은 우회)
drop policy if exists "profiles_select_own" on profiles;
create policy "profiles_select_own" on profiles for select using (auth.uid() = id);
drop policy if exists "profiles_update_own" on profiles;
create policy "profiles_update_own" on profiles for update using (auth.uid() = id);

-- 가입 트리거: auth.users 에 행이 생기면 profiles 자동 생성
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
