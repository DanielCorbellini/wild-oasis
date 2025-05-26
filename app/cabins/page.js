import Counter from "../components/Counter";
import Navigation from "../components/Navigation";

// Server component: Fetching data and using it in html with react components
// We cannot use hooks in react server components
// We can call components that uses hooks, see the Counter component
export default async function Page() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();

  return (
    <div>
      <h1>Cabins page</h1>
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      <Counter />
    </div>
  );
}
