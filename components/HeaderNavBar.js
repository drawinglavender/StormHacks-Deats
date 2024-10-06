import React, { useState, useEffect } from 'react'; // Add useState here
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { createInviteLink } from './cronofyHelper'; // Import the helper function

function HeaderNavBar() {
  const { data: session } = useSession();
  const [profileClick, setProfileClick] = useState(false);
  const [inviteLink, setInviteLink] = useState(''); // Fix for the useState error

  const handleInviteClick = async () => {
    const link = await createInviteLink();
    if (link) {
      setInviteLink(link);
      window.open(link, '_blank'); // Opens invite link in a new tab
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setProfileClick(false);
    }, 6000);
  }, [profileClick == true]);

  return (
    session?.user && (
      <div className="flex items-center justify-between p-2 shadow-md">
        <div className="flex gap-7 items-center">
          <Image src="/logo.png" alt="logo" width={50} height={50} />
          <h2 className="cursor-pointer hover:text-blue-500">Home</h2>
          <h2 className="cursor-pointer hover:text-blue-500">Favourite</h2>
          <h2 className="cursor-pointer hover:text-blue-500" onClick={handleInviteClick}>
            Invite
          </h2>
        </div>
        <div>
          {session?.user ? (
            <>
              <Image
                src={session.user.image}
                alt="user"
                width={40}
                height={40}
                onClick={() => setProfileClick(!profileClick)}
                className="rounded-full cursor-pointer hover:border-[2px] border-blue-500"
              />
              {profileClick ? (
                <div className="absolute bg-white p-3 shadow-md border-[1px] mt-2 z-30 right-4">
                  <h2
                    className="cursor-pointer hover:text-blue-500 hover:font-bold"
                    onClick={() => signOut()}
                  >
                    Logout
                  </h2>
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    )
  );
}

export default HeaderNavBar;
