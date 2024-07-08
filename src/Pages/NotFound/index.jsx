import Layout from "../../Components/Layout";
import Back from "../../Components/Back";

function NotFound() {
  return (
    <Layout>
        <Back />
      <h1 className= 'mt-20'>You don't have any order</h1>
    </Layout>
  );
}

export default NotFound;
