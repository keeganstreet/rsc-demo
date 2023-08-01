import { Header } from "./Header";
import { ClientSection } from "./ClientSection";
import { SlowComponent } from "./SlowComponent";

export default function App() {
  console.log("Render App");
  return (
    <div>
      <Header />
      <ClientSection />
      {/* @ts-expect-error (async component) */}
      <SlowComponent />
      Hello world
    </div>
  );
}
