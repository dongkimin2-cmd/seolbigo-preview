import { emojiIcon, EMOJI_FG } from '../../components/icons';
// p-services — 데이터 기반으로 전환 완료: 서비스 카탈로그(SERVICES/SERVICE_GROUPS)의 단일 소스에서 렌더.
// 홈 카테고리와 같은 데이터를 쓰므로 서비스 추가·수정이 한곳에서 끝납니다. (서버 컴포넌트)
import { SERVICES, SERVICE_GROUPS } from '../../lib/mock-data';

const byId = Object.fromEntries(SERVICES.map(s => [s.id, s]));

export default function Page() {
  return (
    <section className="page on" id="p-services">
      <div className="phead"><div className="phead__in">
        <div className="crumb"><a data-go="home">홈</a><span>›</span><b>전체 서비스</b></div>
        <h1>서비스마다 시작하는 방법이 다릅니다</h1>
        <p className="sub">사진으로 판단되는 일, 현장을 재야 하는 일, 관 속을 봐야 하는 일, 규격이 정해진 일 —
          여섯 가지로 나눠 각각에 맞는 경로로 안내합니다.</p>
      </div></div>

      <div className="flow solo">
        <div style={{ maxWidth: 1000 }}>
          {SERVICE_GROUPS.map((g, gi) => (
            <div key={g.title} className="block" style={gi === SERVICE_GROUPS.length - 1 ? { marginBottom: 0 } : undefined}>
              <div className="row between" style={{ marginBottom: 4 }}>
                <h2 className="block__t" style={{ margin: 0 }}>{g.title}</h2>
                <span className={'badge b12 b-' + g.badgeTone}>{g.badge}</span>
              </div>
              <p className="block__d">{g.desc}</p>
              <div className="grid g3" style={{ gap: 12 }}>
                {g.ids.map(id => {
                  const s = byId[id];
                  return (
                    <button key={id} className="svc" data-go={s.go} data-svc={s.name}>
                      <i style={{ background: s.iconBg, color: EMOJI_FG[s.icon] }}>{emojiIcon(s.icon)}</i>
                      <div><div className="t-b16 fw7">{s.name}</div>
                        <div className="t-b12 c-sec">{s.desc}</div></div>
                      <span className="svc__go">›</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
