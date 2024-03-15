"use client";
import {useRouter} from "next/navigation";

export default function Page() {
  const router = useRouter();

  function go(){
    router.push('/dashboard/class/21d')
  }
  return (
    <div>
      <div>
        class page
      </div>
      <button onClick={go}>
        Go
      </button>
    </div>
  );
}
