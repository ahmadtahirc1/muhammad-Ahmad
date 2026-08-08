import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/adminAuth";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default async function AdminPage() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  return <AdminDashboard />;
}
