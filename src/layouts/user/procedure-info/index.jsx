import UserProcedureInfo from "views/UserProcedureInfo";
import { useLocation } from "react-router-dom";

export default function UserProcedureInfoPage() {
  const location = useLocation();
  return <UserProcedureInfo procedure={location.state.procedure} />;
}
