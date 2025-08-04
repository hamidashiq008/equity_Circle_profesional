import { useSelector } from 'react-redux';
import Header from '../components/Header';

const Home = () => {

  const { user, isLoading, error } = useSelector((state) => state.userDetail);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;
  if (!user) return <div>No user logged in</div>;

  return (
    <>
      <Header />
      <div>Hello, {user.name}</div>

    </>
  );
};

export default Home;
