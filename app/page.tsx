"use client";
import {useEffect,useMemo,useState} from "react";
type Q={q:string;c:string[];a:number;ok:string;no:string}; type Stage={title:string;sub:string;color:string;icon:string;qs:Q[]}; type R={first:number;best:number;tries:number;passed:boolean};
const S:Stage[]=[
 ["รู้จักฟังก์ชันกำลังสองและพาราโบลา","มองภาพรวมของสมการและกราฟ","#38a9f1","∪",[
 ["ข้อใดเป็นฟังก์ชันกำลังสอง",["y = 2x² − 3x + 1","y = 4x − 7","y = 3/x","y = 5"],0,"สัมประสิทธิ์ของ x² ไม่เป็นศูนย์","ฟังก์ชันกำลังสองอยู่ในรูป y = ax² + bx + c เมื่อ a ≠ 0"],
 ["กราฟของฟังก์ชันกำลังสองเรียกว่าอะไร",["เส้นตรง","พาราโบลา","วงกลม","ไฮเพอร์โบลา"],1,"กราฟของฟังก์ชันกำลังสองคือพาราโบลา","ทบทวน: ฟังก์ชันกำลังสอง → กราฟพาราโบลา"],
 ["ถ้า a > 0 พาราโบลามีลักษณะใด",["เปิดขึ้น","เปิดลง","เป็นเส้นตรง","ไม่มีกราฟ"],0,"a เป็นบวก กราฟจึงเปิดขึ้น","จำง่าย ๆ: a > 0 เปิดขึ้น และ a < 0 เปิดลง"],
 ["ใน y = −3x² + 2x + 1 ค่า a คือเท่าใด",["−3","3","2","1"],0,"a คือสัมประสิทธิ์ของ x²","ดูจำนวนที่คูณ x² และเก็บเครื่องหมายไว้ด้วย"],
 ["วิถีลูกบอลที่พุ่งขึ้นแล้วตกลงเหมาะกับกราฟใด",["พาราโบลาเปิดขึ้น","พาราโบลาเปิดลง","เส้นตรงแนวนอน","วงกลม"],1,"มีจุดสูงสุดจึงใช้พาราโบลาเปิดลง","สถานการณ์ที่มีค่าสูงสุดสอดคล้องกับพาราโบลาเปิดลง"]]],
 ["พื้นฐานการสร้างกราฟ","ตารางค่า • คู่อันดับ • การลงจุด","#63c456","✎",[
 ["เมื่อ x = 2 ใน y = x² ค่า y เท่าใด",["2","4","−4","8"],1,"2² = 4","แทน x = 2 ลงในสมการ แล้วคำนวณเลขยกกำลัง"],
 ["คู่อันดับใดอยู่บนกราฟ y = x²",["(2, 4)","(2, 2)","(−2, −4)","(1, 0)"],0,"เพราะ 4 = 2²","แทนพิกัด x แล้วตรวจว่าค่า y ตรงกับสมการหรือไม่"],
 ["y = 2x² เมื่อ x = −1, 0, 1 ให้ค่า y ใด",["2, 0, 2","−2, 0, 2","1, 0, 1","2, 1, 2"],0,"x ที่ตรงข้ามกันให้ y เท่ากัน","คำนวณ 2(−1)², 2(0)² และ 2(1)²"],
 ["ถ้า (3, k) อยู่บน y = x² − 1 แล้ว k เท่าใด",["6","8","9","10"],1,"k = 3² − 1 = 8","แทน x = 3 แล้วค่า y ที่ได้ก็คือ k"],
 ["ก่อนเชื่อมจุดเป็นกราฟ ควรทำสิ่งใด",["กำหนด x และคำนวณ y","ลากเส้นสุ่ม","หาพื้นที่","เปลี่ยนสมการ"],0,"ต้องมีคู่อันดับที่ถูกต้องก่อน","ลำดับคือกำหนด x → หา y → ลงจุด → เชื่อมเส้นโค้ง"]]],
 ["สำรวจ y = ax² และ y = ax² + k","ค้นพบบทบาทของ a และ k","#f3ad20","⌕",[
 ["y = 4x² เทียบกับ y = x² เป็นอย่างไร",["แคบกว่า","กว้างกว่า","เลื่อนขึ้น 4","เลื่อนขวา 4"],0,"|a| มากขึ้นทำให้กราฟแคบ","เมื่อ |a| > 1 กราฟจะแคบกว่า y = x²"],
 ["กราฟ y = −2x² เปิดทางใด",["ขึ้น","ลง","ซ้าย","ขวา"],1,"a < 0 จึงเปิดลง","เครื่องหมายของ a เป็นตัวกำหนดทิศการเปิด"],
 ["y = x² + 5 เลื่อนจาก y = x² อย่างไร",["ขึ้น 5","ลง 5","ขวา 5","ซ้าย 5"],0,"k = 5 จึงเลื่อนขึ้น","k ใน y = ax² + k เลื่อนกราฟตามแนวตั้ง"],
 ["จุดยอดของ y = −3x² − 4 คือจุดใด",["(0, −4)","(−4, 0)","(0, 4)","(3, −4)"],0,"ในรูปนี้จุดยอดคือ (0, k)","ในรูป y = ax² + k จุดยอดคือ (0, k)"],
 ["เปิดขึ้น แคบกว่า y=x² และจุดยอด (0,−2) คือสมการใด",["y=3x²−2","y=−3x²−2","y=0.5x²−2","y=3(x−2)²"],0,"ครบทั้งทิศ ความกว้าง และจุดยอด","ตรวจ 3 เงื่อนไข: a > 0, |a| > 1 และ k = −2"]]],
 ["สำรวจรูปจุดยอด","y = a(x − h)² และ y = a(x − h)² + k","#ef6685","⚙",[
 ["จุดยอดของ y = (x − 3)² คือจุดใด",["(3, 0)","(−3, 0)","(0, 3)","(0, −3)"],0,"h = 3","ใน (x − h)² พิกัด x ของจุดยอดคือ h"],
 ["y = (x + 2)² เลื่อนอย่างไร",["ซ้าย 2","ขวา 2","ขึ้น 2","ลง 2"],0,"x+2 = x−(−2)","เขียน x + 2 เป็น x − (−2) จะได้ h = −2"],
 ["จุดยอดของ y = −2(x − 1)² + 5 คือข้อใด",["(1, 5)","(−1, 5)","(1, −5)","(2, 5)"],0,"จุดยอด (h,k) = (1,5)","อ่าน h และ k โดยระวังเครื่องหมายในวงเล็บ"],
 ["จุดยอด (−4,3) และเปิดขึ้น คือสมการใด",["y=2(x+4)²+3","y=−2(x+4)²+3","y=2(x−4)²+3","y=2(x+4)²−3"],0,"h=−4, k=3 และ a>0","แทน (h,k) ใน y=a(x−h)²+k แล้วเลือก a>0"],
 ["กราฟมีจุดสูงสุด (2,9) สมการใดเหมาะสม",["y=−(x−2)²+9","y=(x−2)²+9","y=−(x+2)²+9","y=−(x−9)²+2"],0,"จุดสูงสุดต้องเปิดลง","จุดสูงสุดบอกว่า a<0 และจุดยอดคือ (2,9)"]]],
 ["กลับสู่รูปทั่วไป","เชื่อมโยง y = ax² + bx + c","#9b62d7","▣",[
 ["2(x−3)²+1 กระจายได้ข้อใด",["2x²−12x+19","2x²−6x+7","2x²+12x+19","2x²−12x+7"],0,"แจกแจงได้ครบทุกพจน์","ใช้ (x−3)²=x²−6x+9 แล้วคูณ 2 ก่อนบวก 1"],
 ["y=x²+6x+5 มี a,b,c เท่าใด",["1, 6, 5","1, 5, 6","6, 1, 5","1, −6, 5"],0,"เทียบสัมประสิทธิ์ตามลำดับ","เรียงพจน์ x², x และค่าคงที่"],
 ["แกนสมมาตรของ y=2x²−8x+3 คือข้อใด",["x=2","x=−2","x=4","y=2"],0,"x=−b/2a=2","ใช้สูตร x = −b/(2a)"],
 ["จุดยอดของ y=x²−4x+1 คือข้อใด",["(2,−3)","(−2,−3)","(2,3)","(4,1)"],0,"แทน x=2 ได้ y=−3","หา x ด้วย −b/(2a) แล้วแทนกลับเพื่อหา y"],
 ["x²−6x+11 เขียนเป็นรูปจุดยอดได้ข้อใด",["(x−3)²+2","(x+3)²+2","(x−3)²−2","(x−6)²+11"],0,"ทำกำลังสองสมบูรณ์ได้พอดี","เติมและหัก 9: x²−6x+9+2"]]],
 ["เชื่อมโยงสมการ–ตาราง–กราฟ","มองความสัมพันธ์หลายรูปแบบ","#24a9d7","↗",[
 ["y เท่ากันเมื่อ x=−2 และ x=2 แกนสมมาตรคือข้อใด",["x=0","x=2","x=−2","y=0"],0,"จุดกึ่งกลางคือ 0","แกนอยู่กึ่งกลางของค่า x ที่ให้ y เท่ากัน"],
 ["จุดยอด (1,−2) ผ่าน (2,0) ใน y=a(x−1)²−2 ค่า a คือ",["2","−2","1","4"],0,"0=a(1)²−2 จึง a=2","แทนคู่อันดับ (2,0) ลงในสมการ"],
 ["ข้อใดไม่อยู่บน y=−x²+4",["(0,4)","(1,3)","(2,0)","(−2,4)"],3,"x=−2 ต้องได้ y=0","แทนค่า x ของแต่ละคู่ลงในสมการ"],
 ["ตาราง x:0,1,2 และ y:3,0,−5 สอดคล้องกับข้อใด",["y=−x²−2x+3","y=x²−4x+3","y=−2x²−x+3","y=−x²+2x+3"],0,"แทนครบทั้งสามค่าแล้วตรงกัน","ตรวจทุกคู่อันดับ ไม่ใช้เพียงจุดเดียว"],
 ["เปิดลง ผ่าน (0,0) และ (4,0) แกนสมมาตรคือ",["x=2","x=4","x=0","y=2"],0,"จุดกึ่งกลางระหว่าง 0 กับ 4 คือ 2","หาค่าเฉลี่ยพิกัด x ของจุดตัดแกนทั้งสอง"]]],
 ["พาราโบลากับสถานการณ์จริง","นำความรู้ไปแก้ปัญหาในชีวิตจริง","#f2a31f","◎",[
 ["h=−t²+6t+7 ลูกบอลสูงสุดเมื่อ t เท่าใด",["3 วินาที","6 วินาที","7 วินาที","9 วินาที"],0,"t=−b/(2a)=3","เวลาที่สูงสุดคือพิกัดแนวนอนของจุดยอด"],
 ["จาก h=−t²+6t+7 ความสูงสูงสุดเท่าใด",["16 เมตร","9 เมตร","7 เมตร","25 เมตร"],0,"h(3)=16 เมตร","แทน t=3 ซึ่งเป็นเวลาที่จุดยอดลงในสมการ"],
 ["ซุ้ม y=−0.5(x−4)²+8 มีจุดสูงสุดใด",["(4,8)","(−4,8)","(8,4)","(0,8)"],0,"อ่านจุดยอด (h,k) ได้ถูกต้อง","สมการรูปจุดยอดให้ (h,k)=(4,8)"],
 ["P=−2x²+40x−150 กำไรมากสุดเมื่อ x เท่าใด",["10","20","40","150"],0,"x=−40/(−4)=10","กำไรสูงสุดอยู่ที่จุดยอดของพาราโบลาเปิดลง"],
 ["y=0.25(x−6)²+2 ข้อความใดถูกต้อง",["ต่ำสุด 2 เมื่อ x=6","สูงสุด 2 เมื่อ x=6","ต่ำสุด 6 เมื่อ x=2","กราฟเปิดลง"],0,"a>0 และจุดยอด (6,2)","a>0 จึงมีค่าต่ำสุด และจุดยอดคือ (6,2)"]]]
].map(x=>({title:x[0],sub:x[1],color:x[2],icon:x[3],qs:(x[4] as unknown[]).map((q:any)=>({q:q[0],c:q[1],a:q[2],ok:q[3],no:q[4]}))})) as Stage[];
const blank=()=>S.map(()=>({first:-1,best:-1,tries:0,passed:false}));
const FALLBACK_SCORE_ENDPOINT="https://script.google.com/macros/s/AKfycbzzqVQL8eoDmFQGYWfKNav-UoYbDMcCJSISjqzUUocTSFCHkuzFgypM-W0psUwvzwSz/exec";

export default function Home(){
 const basePath=process.env.NEXT_PUBLIC_BASE_PATH??"";
 const stagePictures=["detective.png","tablet.png","graduate.png","tablet.png","graduate.png","map.png","basketball.png"].map(name=>`${basePath}/mascot/${name}`);
 const[explorerCode,setExplorerCode]=useState("");
 const[room,setRoom]=useState("");
 const[studentEmail,setStudentEmail]=useState("");
 const[scoreEndpoint,setScoreEndpoint]=useState(FALLBACK_SCORE_ENDPOINT);
 const[embedded,setEmbedded]=useState(false);
 const[view,setView]=useState("map");
 const[si,setSi]=useState(0);const[qi,setQi]=useState(0);const[score,setScore]=useState(0);
 const[pick,setPick]=useState<number|null>(null);const[rs,setRs]=useState<R[]>(blank());
 const[syncMessage,setSyncMessage]=useState("");
 useEffect(()=>{try{
  const params=new URLSearchParams(window.location.search);
  const embeddedMode=params.get("embedded")==="1";
  const queryCode=params.get("explorerCode")||params.get("studentId")||"";
  const queryRoom=params.get("room")||"";
  const queryEmail=params.get("studentEmail")||"";
  const queryEndpoint=params.get("scoreApiUrl")||params.get("webAppUrl")||"";
  const queryStage=Number(params.get("stage"));
  const savedResults=localStorage.getItem("learn-results");
  const savedCode=localStorage.getItem("learn-explorer-code");
  const savedRoom=localStorage.getItem("learn-room");
  if(savedResults)setRs(JSON.parse(savedResults));
  setEmbedded(embeddedMode);
  setExplorerCode(queryCode||savedCode||"");
  setRoom(queryRoom||savedRoom||"");
  setStudentEmail(queryEmail);
  if(queryEndpoint)setScoreEndpoint(queryEndpoint);
  if(embeddedMode&&queryCode&&queryRoom&&Number.isInteger(queryStage)&&queryStage>=1&&queryStage<=7){
   setSi(queryStage-1);setQi(0);setScore(0);setPick(null);setView("quiz");
  }
 }catch{}},[]);
 const unlock=useMemo(()=>{const n=rs.findIndex(r=>!r.passed);return n<0?6:n},[rs]);
 const identityReady=explorerCode.trim()!==""&&room.trim()!=="";
 function start(i:number){if(i>unlock||!identityReady)return;setSi(i);setQi(0);setScore(0);setPick(null);setView("quiz");localStorage.setItem("learn-explorer-code",explorerCode.trim());localStorage.setItem("learn-room",room.trim())}
 function choose(i:number){if(pick!==null)return;setPick(i);if(i===S[si].qs[qi].a)setScore(x=>x+1)}
 async function sendScore(result:R,attemptScore:number){
  setSyncMessage("กำลังส่งคะแนน...");
  const body=new URLSearchParams({
   explorerCode:explorerCode.trim(),studentEmail:studentEmail.trim(),room:room.trim(),stage:String(si+1),stageTitle:S[si].title,
   attemptScore:String(attemptScore),firstScore:String(result.first),bestScore:String(result.best),
   attempts:String(result.tries),passed:String(result.passed)
  });
  try{
   await fetch(scoreEndpoint,{method:"POST",mode:"no-cors",keepalive:true,headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},body:body.toString()});
   setSyncMessage("ส่งคะแนนไปยัง Google Sheets แล้ว ✓");
   if(embedded&&window.parent!==window){
    window.parent.postMessage({type:"LEARN_GAME_SCORE",stage:si+1,score:attemptScore,attemptScore},"*");
   }
  }catch{setSyncMessage("ยังส่งคะแนนไม่ได้ กรุณาตรวจอินเทอร์เน็ต")}
 }
 function next(){if(qi<4){setQi(x=>x+1);setPick(null);return}const a=[...rs],old=a[si];a[si]={first:old.first<0?score:old.first,best:Math.max(old.best,score),tries:old.tries+1,passed:old.passed||score>=4};setRs(a);localStorage.setItem("learn-results",JSON.stringify(a));void sendScore(a[si],score);setView(score>=4&&si===6?"done":"map")}
 const q=S[si].qs[qi];
 if(view==="quiz")return <main className="game"><section className="quiz" style={{"--a":S[si].color} as React.CSSProperties}><header><button onClick={()=>setView("map")}>←</button><div><small>รหัส {explorerCode} • ห้อง {room} • ด่าน {si+1} • ข้อ {qi+1}/5</small><h1>{S[si].title}</h1></div><b>{score} ★</b></header><div className="bar"><i style={{width:`${(qi+1)*20}%`}}/></div><div className="question-row"><h2>{q.q}</h2><img src={stagePictures[si]} alt={`น้องไม่นิ่งประกอบด่านที่ ${si+1}`}/></div><div className="choices">{q.c.map((c,i)=><button key={c} onClick={()=>choose(i)} className={pick===null?"":i===q.a?"correct":pick===i?"wrong":"dim"}><span>{"กขคง"[i]}</span>{c}</button>)}</div>{pick!==null&&<div className={pick===q.a?"feed good":"feed bad"}><img src={`${basePath}/mascot/${pick===q.a?"champion.png":"detective.png"}`} alt="น้องไม่นิ่งให้คำแนะนำ"/><div><b>{pick===q.a?"✓ ตอบถูก!":"✦ ลองคิดอีกนิด"}</b><p>{pick===q.a?q.ok:q.no}</p><button onClick={next}>{qi===4?"ดูผลคะแนน":"ข้อต่อไป →"}</button></div></div>}</section></main>;
 if(view==="done")return <main className="game"><section className="win"><img src={`${basePath}/mascot/champion.png`} alt="น้องไม่นิ่งฉลองชัยชนะ"/><h1>พิชิตพาราโบลาครบ 7 ด่าน!</h1><p>รหัสนักสำรวจ {explorerCode} ห้อง {room} ทำภารกิจสำเร็จแล้ว</p><button onClick={()=>setView("map")}>กลับดูคะแนน</button></section></main>;
 return <main className="map"><header className="hero"><img className="hero-mascot" src={`${basePath}/mascot/logo.png`} alt="น้องไม่นิ่ง มาสคอต LEARN ไม่นิ่ง"/><div><small>LEARN ไม่นิ่ง MODEL</small><h1>ภารกิจพิชิตพาราโบลา</h1><p>เรียนรู้ทีละด่าน เก่งขึ้นทีละขั้น</p></div><div className="identity-fields"><label>รหัสนักสำรวจ<input value={explorerCode} onChange={e=>setExplorerCode(e.target.value)} placeholder="เช่น 30101" autoComplete="off"/></label><label>ห้อง<input value={room} onChange={e=>setRoom(e.target.value)} placeholder="เช่น ม.3/1" autoComplete="off"/></label></div></header>{syncMessage&&<div className="sync-status" role="status">{syncMessage}</div>}<section className="journey"><div className="path"/>{S.map((s,i)=>{const lock=i>unlock,r=rs[i];return <article key={s.title} className={`stage ${lock?"locked":""}`} style={{"--a":s.color} as React.CSSProperties}><div className="badge">{r.passed?"✓":i+1}</div><div><small>ด่านที่ {i+1}</small><h2>{s.title}</h2><p>{s.sub}</p>{r.tries>0&&<aside><span>ครั้งแรก {r.first}/5</span><span>สูงสุด {r.best}/5</span><span>{r.tries} ครั้ง</span></aside>}</div><div className="stage-picture"><img src={stagePictures[i]} alt={`น้องไม่นิ่งประจำด่านที่ ${i+1}`}/>{lock&&<span>🔒</span>}</div><button disabled={lock||!identityReady} onClick={()=>start(i)}>{lock?"ยังไม่ปลดล็อก":r.passed?"เล่นอีกครั้ง":"เริ่มภารกิจ"}</button></article>})}</section><footer><p>กรอกรหัสนักสำรวจและห้องให้ครบ • ผ่านเมื่อได้ <b>4/5</b></p><button onClick={()=>{if(confirm("ล้างคะแนนทั้งหมดใช่ไหม")){const b=blank();setRs(b);localStorage.removeItem("learn-results")}}}>ล้างคะแนน</button></footer></main>
}
