/* Modelo de entrenamiento y guardado; sin dependencias del navegador. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./flexible-core.js'));else root.TrainingCore=factory(root.FlexibleCore);})(typeof globalThis!=='undefined'?globalThis:this,function(F){
 'use strict';
 const DRAFT_KEY='ritmo-session-drafts-v1',LOG_KEY='ritmo-training-log-v1';
 const clone=value=>JSON.parse(JSON.stringify(value));
 function planFor(s){
  const plan=[];let start=0;
  const add=(seconds,kind,name,section,round,reps)=>{plan.push({start,end:start+seconds,seconds,kind,name,section,round,reps:reps||''});start+=seconds;};
  add(600,'work','Calentamiento','Preparación',0,'3 min de bici suave, 3 min de movilidad y 4 min de ensayo sin carga.');
  for(let round=1;round<=3;round++)s.strength.forEach(name=>{
   const reps=/Pallof|Bird dog/.test(name)?'8 por lado':/Zancada|Step-up/.test(name)?'6 por lado':'8–12 repeticiones';
   add(60,'work',name,'Fuerza funcional',round,reps);add(45,'rest',name,'Fuerza funcional',round);add(15,'change',name,'Fuerza funcional',round);
  });
  for(let round=1;round<=4;round++)s.circuit.forEach(name=>{add(40,'work',name,'Circuito',round,'40 segundos de trabajo');add(15,'rest',name,'Circuito',round);add(5,'change',name,'Circuito',round);});
  add(300,'work','Cardio suave','Cardio',0,'Bici o remo a ritmo conversacional. Incluye la transición.');
  add(300,'work','Vuelta a la calma','Recuperación',0,'2 min de marcha lenta y respiración, y 3 min de movilidad suave.');
  return plan;
 }
 function locate(plan,remaining){const total=plan[plan.length-1].end,elapsed=Math.max(0,total-Math.max(0,remaining));let index=plan.findIndex(p=>p.end>elapsed);if(index<0)return {done:true,index:plan.length,step:plan[plan.length-1],left:0,next:null};const step=plan[index];const next=plan.slice(index+1).find(p=>p.kind==='work');return {done:false,index,step,left:Math.ceil(step.end-elapsed),next:next||null};}
 function validDraft(d){return !!d&&typeof d.runId==='string'&&Number.isInteger(d.sessionId)&&d.sessionId>=1&&d.sessionId<=8&&Number.isFinite(d.remaining)&&d.remaining>=0&&d.remaining<=3600&&['ready','in_progress','completed'].includes(d.status)&&d.snapshot&&Array.isArray(d.snapshot.strength)&&d.snapshot.strength.length===4&&Array.isArray(d.snapshot.circuit)&&d.snapshot.circuit.length===4&&d.snapshot.strength.concat(d.snapshot.circuit).every(x=>typeof x==='string')&&Number.isFinite(d.activeSeconds)&&d.activeSeconds>=0&&(!d.mode||['guided','flexible'].includes(d.mode))&&(d.mode!=='flexible'||(F.valid(d.flex)&&d.flex.strength.every((x,i)=>x.name===d.snapshot.strength[i])&&d.flex.circuit.every((x,i)=>x.name===d.snapshot.circuit[i])));}
 class Repository{
  constructor(storage){this.storage=storage;}
  read(key,fallback){const raw=this.storage.getItem(key);if(!raw)return clone(fallback);const value=JSON.parse(raw);if(key===LOG_KEY&&(!Array.isArray(value)||!value.every(r=>r&&typeof r.date==='string'&&Array.isArray(r.rows))))throw Error('El historial no tiene un formato válido.');if(key===DRAFT_KEY&&(!value||typeof value!=='object'||Array.isArray(value)||!Object.values(value).every(validDraft)))throw Error('La sesión guardada no tiene un formato válido.');return value;}
  drafts(){return this.read(DRAFT_KEY,{});}
  records(){return this.read(LOG_KEY,[]);}
  saveDraft(d){if(!validDraft(d))throw Error('No se puede guardar una sesión no válida.');const all=this.drafts();all[d.sessionId]=clone(d);this.storage.setItem(DRAFT_KEY,JSON.stringify(all));}
  complete(d,details){if(!validDraft(d))throw Error('Sesión no válida.');const rows=this.records();const exists=rows.find(r=>r.runId===d.runId);if(exists)return exists;const record={...clone(details),runId:d.runId,sessionId:d.sessionId,title:d.snapshot.title,status:'completed',durationSeconds:Math.ceil(d.activeSeconds),startedAt:d.startedAt||null,snapshot:clone(d.snapshot)};rows.push(record);this.storage.setItem(LOG_KEY,JSON.stringify(rows));return record;}
 }
 return {DRAFT_KEY,LOG_KEY,planFor,locate,validDraft,Repository};
});
