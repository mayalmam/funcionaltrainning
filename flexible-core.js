/* Modo flexible: cada vuelta se acredita solo al terminar el trabajo. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.FlexibleCore=factory();})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 const settings={strength:{rounds:3,work:60,rest:45,change:15,label:'Fuerza funcional'},circuit:{rounds:4,work:40,rest:15,change:5,label:'Circuito'}};
 const stages=['warmup','strength','circuit','cardio','cooldown','done'];
 function create(s){return {version:1,stage:'warmup',warmupLeft:600,cardioLeft:300,cooldownLeft:300,strength:s.strength.map(name=>({name,done:0,omitted:false,deferred:false,partial:null,loads:[]})),circuit:s.circuit.map(name=>({name,done:0,omitted:false,deferred:false,partial:null,loads:[]})),task:null,events:[]};}
 function valid(f){if(!f||f.version!==1||!stages.includes(f.stage)||!Array.isArray(f.events))return false;for(const [key,max]of [['warmupLeft',600],['cardioLeft',300],['cooldownLeft',300]])if(!Number.isFinite(f[key])||f[key]<0||f[key]>max)return false;for(const b of ['strength','circuit']){const c=settings[b];if(!Array.isArray(f[b])||f[b].length!==4||!f[b].every(x=>x&&typeof x.name==='string'&&Number.isInteger(x.done)&&x.done>=0&&x.done<=c.rounds&&typeof x.omitted==='boolean'&&typeof x.deferred==='boolean'&&Array.isArray(x.loads)&&x.loads.length===x.done&&(x.partial===null||(Number.isFinite(x.partial)&&x.partial>0&&x.partial<=c.work))))return false;}if(f.task){const t=f.task,c=settings[f.stage];if(!c||t.block!==f.stage||!Number.isInteger(t.index)||t.index<0||t.index>3||!['work','rest','change'].includes(t.phase)||!Number.isFinite(t.left)||t.left<=0||t.left>c[t.phase]||typeof t.started!=='boolean')return false;const i=f[t.block][t.index];if(i.omitted||(t.phase==='work'&&i.done>=c.rounds)||(t.phase!=='work'&&i.done===0))return false;}return true;}
 function waiting(f){return !!settings[f.stage]&&!f.task;}
 function resolved(f){return !!settings[f.stage]&&f[f.stage].every(i=>i.omitted||i.done===settings[f.stage].rounds);}
 function select(f,index){if(!waiting(f)||!Number.isInteger(index)||index<0||index>3)return false;const item=f[f.stage][index],c=settings[f.stage];if(item.omitted||item.done>=c.rounds)return false;f.task={block:f.stage,index,phase:'work',left:item.partial??c.work,started:item.partial!==null};item.partial=null;item.deferred=false;return true;}
 function defer(f){if(!f.task||f.task.phase!=='work')return false;const i=f[f.task.block][f.task.index];i.partial=f.task.left;i.deferred=true;f.task=null;return true;}
 function omit(f,index){if(!settings[f.stage]||!Number.isInteger(index)||index<0||index>3)return false;if(f.task&&(f.task.index!==index||f.task.phase!=='work'))return false;const i=f[f.stage][index];if(i.done>=settings[f.stage].rounds)return false;if(f.task){i.partial=f.task.left;f.task=null;}i.omitted=true;return true;}
 function restore(f,index){if(!waiting(f)||!f[f.stage]?.[index])return false;f[f.stage][index].omitted=false;return true;}
 function nextBlock(f){if(!waiting(f)||!resolved(f))return false;f.stage=f.stage==='strength'?'circuit':'cardio';return true;}
 function finishStep(f,load='',at=new Date().toISOString()){
  if(f.stage==='warmup'){f.warmupLeft=0;f.stage='strength';return true;}if(f.stage==='cardio'){f.cardioLeft=0;f.stage='cooldown';return true;}if(f.stage==='cooldown'){f.cooldownLeft=0;f.stage='done';return true;}
  if(!f.task)return false;const t=f.task,i=f[t.block][t.index],c=settings[t.block];
  if(t.phase==='work'){i.done++;const record={round:i.done,load:String(load),at};i.loads.push(record);f.events.push({block:t.block,index:t.index,name:i.name,...record});t.phase='rest';t.left=c.rest;}
  else if(t.phase==='rest'){t.phase='change';t.left=c.change;}else f.task=null;
  return true;
 }
 function advance(f,seconds,load='',at=new Date().toISOString()){
  let consumed=0,remaining=Math.max(0,seconds),guard=0;
  while(remaining>0&&f.stage!=='done'&&!waiting(f)&&guard++<10){let left=f.task?f.task.left:f.stage==='warmup'?f.warmupLeft:f.stage==='cardio'?f.cardioLeft:f.cooldownLeft;const used=Math.min(left,remaining);left-=used;remaining-=used;consumed+=used;if(f.task)f.task.left=left;else if(f.stage==='warmup')f.warmupLeft=left;else if(f.stage==='cardio')f.cardioLeft=left;else f.cooldownLeft=left;if(left<=0)finishStep(f,load,at);}
  return consumed;
 }
 function remaining(f){let total=f.warmupLeft+f.cardioLeft+f.cooldownLeft;for(const b of ['strength','circuit']){const c=settings[b];f[b].forEach((i,index)=>{if(i.omitted)return;total+=(c.rounds-i.done)*(c.work+c.rest+c.change);if(i.partial!==null)total-=c.work-i.partial;if(f.task?.block===b&&f.task.index===index){if(f.task.phase==='work')total-=c.work-f.task.left;else total+=f.task.phase==='rest'?f.task.left+c.change:f.task.left;}});}return Math.max(0,total);}
 function position(f){if(f.stage==='done')return {done:true,index:'done',left:0,step:{kind:'work',name:'Vuelta a la calma',section:'Recuperación',round:0,reps:''},next:null};if(waiting(f))return {waiting:true};
  if(f.task){const t=f.task,i=f[t.block][t.index],c=settings[t.block],round=t.phase==='work'?i.done+1:i.done;return {done:false,index:t.block+'-'+t.index+'-'+round+'-'+t.phase,left:Math.ceil(t.left),step:{kind:t.phase,name:i.name,section:c.label,round,reps:t.block==='circuit'?'40 segundos de trabajo':/Pallof|Bird dog/.test(i.name)?'8 por lado':/Zancada|Step-up/.test(i.name)?'6 por lado':'8–12 repeticiones'},next:{name:t.phase==='work'?'Descansar y elegir el próximo ejercicio':'Elegir el próximo ejercicio disponible'}};}
  const dict={warmup:['Calentamiento','Preparación','warmupLeft','3 min de bici suave, 3 min de movilidad y 4 min de ensayo sin carga.'],cardio:['Cardio suave','Cardio','cardioLeft','Bici o remo a ritmo conversacional.'],cooldown:['Vuelta a la calma','Recuperación','cooldownLeft','Marcha lenta, respiración y movilidad suave.']},s=dict[f.stage];return {done:false,index:f.stage,left:Math.ceil(f[s[2]]),step:{kind:'work',name:s[0],section:s[1],round:0,reps:s[3]},next:f.stage==='cooldown'?null:{name:f.stage==='warmup'?'Elegir ejercicio de fuerza':'Vuelta a la calma'}};
 }
 function results(f){return ['strength','circuit'].flatMap(b=>f[b].map(i=>({exercise:i.name,block:settings[b].label,completedRounds:i.done,targetRounds:settings[b].rounds,status:i.omitted?'Omitido hoy':i.done===settings[b].rounds?'Completado':i.done>0?'Parcial':'Pendiente',loads:i.loads.map(x=>({...x}))})));}
 return {create,valid,settings,waiting,resolved,select,defer,omit,restore,nextBlock,finishStep,advance,remaining,position,results};
});
