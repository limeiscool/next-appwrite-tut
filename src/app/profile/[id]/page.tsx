export default function IdPage({params} : any) {
  return (
    <div className="flex flex-col items-center justify-center py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page {params.id}</p>
    </div>
  )
}