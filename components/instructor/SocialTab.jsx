import React from "react";


// SocialTab Component
export default function SocialTab({ user, setUser }) {
  return (
    <div className="border p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Social Profiles</h2>
      {user.socials && (
        user.socials.map((social, index) => (
            <div key={index} className="mb-2">
            <p>{social.platform}: {social.url}</p>
            </div>
        ))
        )}
        {!user.socials && <p>No details added </p>}
    </div>
  );
}