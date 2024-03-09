import Fingerprint from "@/components/Fingerprint";
import Spinner from "@/components/spinner";

export default function Home() {
    return <>
        <Fingerprint />
        <Spinner visible={true} />
    </>
}