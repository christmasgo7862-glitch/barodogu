// firestore.rules 를 Firebase(barodogu-eaa32)에 자동으로 반영합니다.
const fs = require('fs');
if (!process.env.SA) {
  console.log('FIREBASE_SERVICE_ACCOUNT 비밀값이 아직 없어 이번에는 건너뜁니다.');
  process.exit(0);
}
const admin = require('firebase-admin');
const sa = JSON.parse(process.env.SA);
admin.initializeApp({ credential: admin.credential.cert(sa), projectId: sa.project_id });
admin.securityRules()
  .releaseFirestoreRulesetFromSource(fs.readFileSync('firestore.rules', 'utf8'))
  .then(r => console.log('규칙 반영 완료:', r.name, r.createTime))
  .catch(e => { console.error('규칙 반영 실패:', e.message); process.exit(1); });
