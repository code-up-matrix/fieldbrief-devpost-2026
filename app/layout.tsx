import "./styles.css";
import type {ReactNode} from "react";
export const metadata={title:"FieldBrief",description:"Evidence-linked handover briefs that keep unresolved observations visible."};
export default function Layout({children}:{children:ReactNode}){return <html lang="en"><body className="lab">{children}</body></html>;}
