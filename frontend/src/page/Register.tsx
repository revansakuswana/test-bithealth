import { RegisterForm } from "@/components/register-form";

export default function Register() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="bg-muted relative hidden lg:block">
        <img
          src="https://img.freepik.com/free-vector/warehouse-composition_1284-25348.jpg?uid=R25768543&ga=GA1.1.1461379232.1738861124&semt=ais_hybrid&w=740"
          alt="hero"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start items-center font-semibold text-2xl">
          <div className="text-primary-foreground flex w-10items-center justify-center">
            <img
              src="https://media.licdn.com/dms/image/v2/D4E0BAQEtbeSJkNL14Q/company-logo_200_200/company-logo_200_200/0/1664787920525/bithealth_logo?e=2147483647&v=beta&t=XrTtFiOeMmG2EDSrOY4FI9O8yeX_NKNX33bRFkcCIwQ"
              alt="Logo"
              className="w-10 object-contain rounded-lg"
            />
          </div>
          Bithealth
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
