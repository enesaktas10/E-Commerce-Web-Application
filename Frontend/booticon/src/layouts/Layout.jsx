import Title from '../components/common/Title';
import Nav from '../components/common/Nav';
import Footer from '../components/common/Footer';


const Layout = ({ children }) => {
    return (
        <>
            <Title></Title>
            <Nav />
            {children}
            <Footer></Footer>

        </>
    );
}

export default Layout;
