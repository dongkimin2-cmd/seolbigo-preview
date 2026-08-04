// 자동 이식된 목업 화면 p-mgr-contract — 원본: seolbigo-preview/index.html (백오피스)
// 헤더·내브는 BackofficeShell 공용 (실제 <Link> 라우팅) — 2026-08-04
// 데이터 기반 전환 (2026-08-04) — KPI·기준 주기는 lib/mgr-data.ts, 동별 표는 ContractClient(칩 필터 실동작)
import BackofficeShell from '../../../components/BackofficeShell';
import ContractClient from '../../../components/mgr/ContractClient';
import { MGR_CONTRACT_KPIS, MGR_CYCLE_TIERS } from '../../../lib/mgr-data';

export default function Page() {
  return (
    <BackofficeShell persona="mgr" id="p-mgr-contract">

            <h1 className="t-h24" style={{ margin: "0 0 4px" }}>정기 세정 계약</h1>
            <p className="t-b14 c-sec" style={{ margin: "0 0 20px" }}>건물별 오염 속도로 산출된 주기에 맞춰 일정이 자동 배정됩니다. 장기수선계획·관리비 예산 주기와 연동됩니다.</p>

            <div className="grid g4" style={{ gap: 12, marginBottom: 16 }}>
              {MGR_CONTRACT_KPIS.map(k => (
                <div key={k.label} className="panel" style={k.warn ? { background: "var(--sg-bg-warning-subtle)", boxShadow: "none" } : undefined}>
                  <div className="t-b12 c-sec">{k.label}</div>
                  <div className={'t-h24 num' + (k.valueBrand ? ' c-brand' : '')}
                    style={k.warn ? { margin: "4px 0 2px", color: "var(--sg-text-warning)" } : { margin: "4px 0 2px" }}>{k.value}</div>
                  <div className={k.subSuccess ? 't-b12 c-suc fw6' : 't-b12 c-sec'}>{k.sub}</div>
                </div>
              ))}
            </div>

            <div className="panel" style={{ marginBottom: 16 }}>
              <h3 className="panel__t">기준 주기</h3>
              <p className="t-b12 c-sec" style={{ margin: "-8px 0 14px" }}>설비고 표준 주기를 기본값으로 쓰되,
                오염도 조사 결과가 있으면 그 건물의 실측 주기로 자동 대체됩니다.</p>
              <div className="grid g3" style={{ gap: 12 }}>
                {MGR_CYCLE_TIERS.map(t => (
                  <div key={t.title} className={t.on ? 'tier on' : 'tier'}><div><div className="t-b14 fw7">{t.title}</div>
                    <div className="t-b12 c-sec">{t.desc}</div></div><span className={t.on ? 't-b16 fw7 c-brand' : 't-b16 fw7'}>{t.cycle}</span></div>
                ))}
              </div>
            </div>

            <ContractClient />
    </BackofficeShell>
  );
}
