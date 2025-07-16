
import Link from "next/link";

export default function CollectionLink({ name, slug }) {
  return (
    <Link href={`/category/${slug}`}>
      <span className="hover:text-black cursor-pointer uppercase">{name}</span>
    </Link>
  );
}
