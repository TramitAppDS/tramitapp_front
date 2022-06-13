import TramiterProcedureInfo from "views/TramiterProcedureInfo";
import { useLocation } from "react-router-dom";

export default function TramiterProcedureInfoPage() {
  const location = useLocation();
  return <TramiterProcedureInfo procedure={location.state.procedure} />;
}
