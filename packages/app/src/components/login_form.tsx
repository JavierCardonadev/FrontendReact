import {useEffect, useState} from 'react';
import { useAuth } from '../context/AuthContext';
import {useNavigate} from "react-router-dom";
import {useAuthStore} from "shared";

const Login = () => {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    useEffect(() => {
        if(user) navigate("/");
    }, [user]);

    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await login(username, password);

        switch (response?.role) {
            case "client":
                navigate("/dashboard");
                break;
            case "admin":
                navigate("/admin");
                break;
            default:
                setError("Credenciales inconrrectas, intente de nuevo...");
                break;
        }
    };

  return (
      <div className={'container-pages login'}>
          <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 bg-white rounded shadow-lg">
              <h1 className="text-2xl font-bold mb-4 title-login">Iniciar sesión</h1> <br/>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Usuario"
                  className="block w-full p-2 border mb-2 rounded"
              />
              <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  className="block w-full p-2 border mb-4 rounded"
              />
              <button className="block w-full bg-white text-black py-2 rounded hover:bg-[#177E5D] btn-login" type={"submit"}>
                  Entrar
              </button>
          </form>
      </div>
  );
};

export default Login;