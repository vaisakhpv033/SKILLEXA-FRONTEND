import ResetPasswordForm from "./ResetPassword";

// SecurityTab Component
export function SecurityTab({ user, setUser }) {
  
    return (
      <div className="border p-6 rounded-lg">
        <ResetPasswordForm />
      </div>
    );
  }
  