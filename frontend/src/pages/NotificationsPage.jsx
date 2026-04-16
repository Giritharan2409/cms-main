import { useSearchParams } from 'react-router-dom';
import { getUserSession } from '../auth/sessionController';
import NotificationCenter from '../components/NotificationCenter';
import Layout from '../components/Layout';

export default function NotificationsPage() {
  const [searchParams] = useSearchParams();
  const session = getUserSession();
  const role = searchParams.get('role') || session?.role || 'student';

  return (
    <Layout title="Notifications">
      <NotificationCenter role={role} />
    </Layout>
  );
}
