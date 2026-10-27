import { useState } from "react";
import { Button, Heading, TextField } from "../components/ui";

export function Login({ onSuccess }: { onSuccess: () => void }) {
  const [role, setRole] = useState<"couple" | "vendor">("couple");
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl border border-[#E8E2DA] p-6 space-y-4">
      <Heading>Welcome</Heading>
      <div role="tablist" className="grid grid-cols-2 bg-[#FBF7F2] rounded-lg p-1">
        {(["couple", "vendor"] as const).map((r) => <button key={r} role="tab" aria-selected={role === r} onClick={() => setRole(r)} className={`min-h-11 rounded-md font-medium ${role === r ? "bg-white shadow" : "text-[#6b6460]"}`}>I'm a {r}</button>)}
      </div>
      <TextField label="Email" type="email" />
      <TextField label="Password" type="password" />
      <Button className="w-full" onClick={onSuccess}>Create account</Button>
      <Button variant="secondary" className="w-full">Continue with Google</Button>
    </div>
  );
}
