import React, { useState } from 'react';
import { gapi } from 'gapi-script';

const GoogleLoginButton = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignInClick = () => {
    if (!isSignedIn) {
      gapi.auth2.getAuthInstance().signIn();
    }
  };

  const handleSignOutClick = () => {
    if (isSignedIn) {
      gapi.auth2.getAuthInstance().signOut();
    }
  };

  // Initialize the Google API client library.
  const initClient = () => {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        clientId: '804381752020-4ggekdcvl4enusj5mgpgf8qd9vr0ah5v.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/drive.metadata.readonly',
      })
      .then(() => {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen((signedIn:any) => {
          setIsSignedIn(signedIn);
        });

        // Set the initial sign-in state.
        setIsSignedIn(gapi.auth2.getAuthInstance().isSignedIn.get());
      });
    });
  };

  // Load the Google API client library when the component mounts.
  React.useEffect(() => {
    gapi.load('client:auth2', initClient);
  }, []);

  return (
    <div>
      {isSignedIn ? (
        <div className="flex gap-2">
          <button onClick={handleSignOutClick} className="flex h-fit w-fit bg-green-400 p-4 font-bold rounded-full hover:bg-slate-300 duration-150 transition-colors self-center">Sign out</button>
          <p className="flex">You are signed in with Google!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <button onClick={handleSignInClick} className="flex h-fit w-fit bg-green-400 p-4 font-bold rounded-full hover:bg-slate-300 duration-150 transition-colors self-center">Sign in with Google</button>
          <p className="flex self-center">You are not signed in with Google.</p>
        </div>
      )}
    </div>
  );
};

export default GoogleLoginButton;