import {catalog} from "../data/catalog";
import type {ApplianceInput,CartridgeFamily,Recommendation,SiteInput,TankSize} from "../types";
const item=(family:CartridgeFamily)=>catalog.find(x=>x.family===family)!;
export const permanentHardness=(s:SiteInput)=>Math.max(0,s.totalHardness-s.carbonateHardness);
export const requiresBestprotect=(s:SiteInput)=>permanentHardness(s)>6;
export function bypassFor(family:CartridgeFamily,site:SiteInput):string{
 if(family==="bestmax") return site.carbonateHardness>=25?"2":"3";
 if(family==="bestmaxPremium") return site.totalHardness>=25?"2":"3";
 if(family==="bestclear") return "0";
 return "N/A";
}
export function recommendDirect(site:SiteInput):Recommendation[]{
 const protect=requiresBestprotect(site);
 return site.appliances.filter(a=>a.quantity>0).map(application=>{
  let family:CartridgeFamily="bestmax";
  if(["espresso","batch","oven"].includes(application.type)) family=protect?"bestprotect":"bestmax";
  if(application.type==="ice") family="bestico";
  if(application.type==="dishwasher") family="bestclear";
  if(application.type==="dispenser") family="besttaste";
  const p=item(family);
  return {application,family,productName:p.name,basis:p.hardnessBasis==="TH"?"Total hardness":p.hardnessBasis==="KH"?"Carbonate hardness":p.hardnessBasis,bypass:bypassFor(family,site),availableSizes:p.sizes};
 });
}
export const applianceCount=(site:SiteInput)=>site.appliances.reduce((n,a)=>n+a.quantity,0);
export const recommendedTank=(site:SiteInput):TankSize=>applianceCount(site)>4?16:8;
export const needsRemineralization=(type:string)=>type==="espresso"||type==="batch";
