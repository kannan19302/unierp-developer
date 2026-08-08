import { Spinner } from "@kannan19302/ui";

export default function LoadingPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
      }}
    >
      <Spinner size="lg" />
    </div>
  );
}
