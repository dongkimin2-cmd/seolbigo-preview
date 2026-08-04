'use client';
// 지급 결정 패널 클라이언트 — 승인 버튼의 done 상태 전이(GroupbuyClient 의 joined 패턴)와
// 손해사정 배정·추가 자료 요청 토스트를 처리. 데이터는 lib/ins-data 의 CASE_DECISION.
import { useState } from 'react';
import { CASE_DECISION } from '../../lib/ins-data';
import { toast } from '../../lib/toast';

export default function CaseDecisionClient() {
  const [approved, setApproved] = useState(false);
  const D = CASE_DECISION;

  const approve = () => {
    if (approved) return;
    setApproved(true);
    toast(D.approveToast);
  };

  return (
    <div className="panel">
      <h3 className="panel__t">지급 결정</h3>
      <div className="col gap8" style={{ marginBottom: 14 }}>
        {D.rows.map(r => (
          <div key={r.label} className="row between">
            <span className="t-b14 c-sec">{r.label}</span><span className={r.valueClass}>{r.value}</span></div>
        ))}
      </div>
      <hr className="hair" style={{ margin: "0 0 14px" }} />
      <div className="row between" style={{ marginBottom: 16 }}>
        <span className="t-h16">지급 예정액</span><span className="t-h24 num c-brand">{D.payout}</span></div>
      <button className={'btn large primary block' + (approved ? ' done' : '')} disabled={approved}
        onClick={approve}>{approved ? D.approveDone : D.approveLabel}</button>
      <button className="btn medium outlined block" style={{ marginTop: 8 }}
        onClick={() => toast(D.assignToast)}>{D.assignLabel}</button>
      <button className="btn medium ghost block" style={{ marginTop: 4 }}
        onClick={() => toast(D.requestToast)}>{D.requestLabel}</button>
    </div>
  );
}
