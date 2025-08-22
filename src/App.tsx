import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import '@/assets/styles/global.scss';
import { UserForm } from '@/components/Form';

function App() {
  return (
    <>
      <Header />
      <main>
        <UserForm />
      </main>
      <Footer />
    </>
  );
}

export default App;
