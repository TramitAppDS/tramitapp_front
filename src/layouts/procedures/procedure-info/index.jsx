import ProcedureInfo from "views/ProcedureInfo";
import { useLocation } from "react-router-dom";

export default function ProcedureInfoPage() {
  const location = useLocation();
  return <ProcedureInfo procedure={location.state.procedure} />;
}
