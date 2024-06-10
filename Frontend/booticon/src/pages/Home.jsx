import Layout from "../layouts/Layout"
import Body from "../components/Body";
import Firsatlar from "../components/Firsatlar";
import AnaSayfaCategoryLaptop from "../components/AnaSayfaCategoryLaptop";


function Home() {



    return (

        <Layout>
            <Body></Body>
            <AnaSayfaCategoryLaptop></AnaSayfaCategoryLaptop>
            <Firsatlar></Firsatlar>
        </Layout>
    )
}

export default Home