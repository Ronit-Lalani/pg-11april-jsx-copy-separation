import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import Spinner from "@/components/ui/spinner";
import { useState } from "react";

const SocialSignIn = ({ mode = "signin", className = "" }) => {
  const { toast } = useToast();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);

  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true);

    setTimeout(() => {
      toast({
        title: "Google authentication not implemented",
        description: "This feature requires Google OAuth credentials to work properly.",
        variant: "info",
      });
      setIsGoogleLoading(false);
    }, 1500);
  };

  const handleFacebookSignIn = () => {
    setIsFacebookLoading(true);

    setTimeout(() => {
      toast({
        title: "Facebook authentication not implemented",
        description: "This feature requires Facebook OAuth credentials to work properly.",
        variant: "info",
      });
      setIsFacebookLoading(false);
    }, 1500);
  };

  return (
    <div className={className}>
      <div className="flex flex-col space-y-4">
        <Button
          variant="outline"
          onClick={handleGoogleSignIn}
          disabled={isGoogleLoading || isFacebookLoading}
          className="relative"
          aria-label={`${mode === "signin" ? "Sign in" : "Sign up"} with Google`}
        >
          {isGoogleLoading ? (
            <>
              <Spinner size="sm" className="absolute left-4" />
              <span className="opacity-60">
                {mode === "signin" ? "Signing in..." : "Signing up..."}
              </span>
            </>
          ) : (
            <>
              <FaGoogle className="mr-2 h-4 w-4 text-red-500" />
              {mode === "signin" ? "Sign in with Google" : "Sign up with Google"}
            </>
          )}
        </Button>

        <Button
          variant="outline"
          onClick={handleFacebookSignIn}
          disabled={isGoogleLoading || isFacebookLoading}
          className="relative"
          aria-label={`${mode === "signin" ? "Sign in" : "Sign up"} with Facebook`}
        >
          {isFacebookLoading ? (
            <>
              <Spinner size="sm" className="absolute left-4" />
              <span className="opacity-60">
                {mode === "signin" ? "Signing in..." : "Signing up..."}
              </span>
            </>
          ) : (
            <>
              <FaFacebook className="mr-2 h-4 w-4 text-blue-600" />
              {mode === "signin" ? "Sign in with Facebook" : "Sign up with Facebook"}
            </>
          )}
        </Button>
      </div>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-2 text-xs text-muted-foreground">
            OR CONTINUE WITH EMAIL
          </span>
        </div>
      </div>
    </div>
  );
};

export default SocialSignIn;
