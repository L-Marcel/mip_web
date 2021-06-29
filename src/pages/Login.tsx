import { useUser } from '../hooks/useUser';

export default function LoginPage() {
  const { user } = useUser();

  return (
    <div>
      <h1>
        Usuário atual: {user?.name}
      </h1>
    </div>
  );
};