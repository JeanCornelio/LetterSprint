import { GithubIcon, GoogleIcon } from '../icons/Icons';
import { useTestConfiguration } from '../hooks/useTestConfiguration';
import { UI_LABELS } from '../constants/uiLabels';

interface ExternalAuthenticationProps {
  onSignInWithGoogle: () => void;
  onSignWithGithub: () => void;
}

export const ExternalAuthentication = ({ onSignInWithGoogle, onSignWithGithub }: ExternalAuthenticationProps) => {
  const { language } = useTestConfiguration();
  const labels = UI_LABELS[language];

  return (
    <div className="flex flex-col w-full gap-4 mb-4 ">
      <button className="p-4 rounded-md bg-sprint-config hover:text-sprint-blue transition" onClick={() => onSignInWithGoogle()}>
        <span className="flex gap-3 items-center ">
          <GoogleIcon className="text-xl" />
          {labels.auth.signInWithGoogle}
        </span>
      </button>
      <button className="p-4 rounded-md bg-sprint-config hover:text-sprint-blue transition" onClick={() => onSignWithGithub()}>
        <span className="flex gap-2 items-center ">
          <GithubIcon className="text-xl" />
          {labels.auth.signInWithGithub}
        </span>
      </button>
    </div>
  );
};
