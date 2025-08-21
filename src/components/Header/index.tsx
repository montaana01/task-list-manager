import { header } from '@/constants';
import { Container } from '@/components/Container';

export const Header = () => {
  return (
    <header className="header">
      <Container>
        <div className="header_wrapper">
          <img src={header.imageFilePath} alt={header.imageAlt} className="header_img" />
        </div>
      </Container>
    </header>
  );
};
