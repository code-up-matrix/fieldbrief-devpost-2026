import {beforeEach,describe,expect,it,vi} from "vitest";
import {createHmac} from "node:crypto";
import {EvidenceInput,fieldBrief,validateBrief} from "../lib/fieldbrief";
beforeEach(()=>{vi.unstubAllGlobals();process.env.SESSION_SECRET="test-session-secret-with-at-least-32-characters";process.env.TWITCH_WEBHOOK_SECRET="test-webhook-secret-with-at-least-32-characters";});
describe("grounded provider output",()=>{
 const valid={summary:"Check the guard.",findings:[{claim:"Guard is loose.",evidenceIds:["E1"]}],unknowns:[],nextChecks:["Inspect guard."]};
 it("rejects fabricated evidence IDs",()=>expect(()=>validateBrief({...valid,findings:[{claim:"Ready",evidenceIds:["FAKE"]}]},["E1"])).toThrow("unverifiable"));
 it("rejects duplicate evidence identifiers",()=>expect(EvidenceInput.safeParse({question:"What happened?",evidence:[{id:"E1",text:"First record"},{id:"E1",text:"Other record"}]}).success).toBe(false));
 it("calls Nebius using a catalog-confirmed NVIDIA model and preserves provenance",async()=>{process.env.NEBIUS_API_KEY="test-nebius-key";process.env.NEBIUS_NVIDIA_MODEL="nvidia/test-model";const f=vi.fn().mockResolvedValueOnce(Response.json({data:[{id:"nvidia/test-model"}]})).mockResolvedValueOnce(Response.json({id:"test-response",choices:[{message:{content:JSON.stringify(valid)}}]}));vi.stubGlobal("fetch",f);const r=await fieldBrief({question:"What is known?",evidence:[{id:"E1",text:"Guard is loose."},{id:"E2",text:"Not inspected."}]});expect(r.provenance.responseId).toBe("test-response");expect(f.mock.calls[1][0]).toBe("https://api.tokenfactory.nebius.com/v1/chat/completions");expect(JSON.parse(f.mock.calls[1][1].body).model).toBe("nvidia/test-model");});
 it("fails closed if the configured model is absent",async()=>{process.env.NEBIUS_API_KEY="test-key";process.env.NEBIUS_NVIDIA_MODEL="nvidia/missing";const f=vi.fn().mockResolvedValue(Response.json({data:[]}));vi.stubGlobal("fetch",f);await expect(fieldBrief({question:"What is known?",evidence:[{id:"E1",text:"Test record."}]})).rejects.toThrow("catalog");expect(f).toHaveBeenCalledTimes(1);});
});
