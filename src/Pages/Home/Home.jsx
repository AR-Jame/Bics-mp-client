import Banner from "./Banner";
import Goals from "./Goals";
import Points from "./Points";
import Counter from "./Counter";
import Map from "./Map";
import CentralLeader from "./CentralLeader";


const Home = () => {
    return (
        <section className="space-y-20 mt-14">
            <Banner />
            <Goals />
            <Points />
            <Counter />
            <Map />
            <CentralLeader />
        </section>
    );
};

export default Home;