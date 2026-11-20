export type Scenario="direct"|"roc";
export type ApplianceType="espresso"|"batch"|"ice"|"oven"|"dishwasher"|"dispenser";
export type RocModel="ROC14"|"ROC16";
export type TankSize=4|8|16;
export type CartridgeFamily="bestmax"|"bestmaxPremium"|"bestprotect"|"bestico"|"bestclear"|"besttaste"|"bestdeminPlus"|"bestminCoffee";
export interface ApplianceInput { type:ApplianceType; label:string; quantity:number }
export interface SiteInput { totalHardness:number; carbonateHardness:number; appliances:ApplianceInput[] }
export interface CatalogItem { id:string; name:string; family:CartridgeFamily; sizes:string[]; hardnessBasis:"TH"|"KH"|"fixed"|"conductivity"; bypassSupported:boolean }
export interface Recommendation { application:ApplianceInput; family:CartridgeFamily; productName:string; basis:string; bypass:string; availableSizes:string[] }
export interface RocSettings { model:RocModel; tankSize:TankSize }
export interface LayoutConfig { scenario:Scenario; site:SiteInput; sedimentEnabled:boolean; roc:RocSettings }
export type LayoutNodeKind="source"|"sediment"|"cartridge"|"roc"|"tank"|"remineralizer"|"appliance";
export interface LayoutNodeData
  extends Record<string, unknown> {

  label: string;
  subtitle: string;
  kind: LayoutNodeKind;

  editable?: boolean;
  applicationType?: ApplianceType;
  family?: CartridgeFamily;
  tankSize?: TankSize;
}
