import { useNavigate } from 'react-router-dom'
import { Form, FormFieldSet, Button, Checkbox, OtpField, Avatar, toast } from 'oks-ui'
import AuthLayout, { Link } from './AuthLayout'

export function Login() {
  const navigate = useNavigate()
  return (
    <AuthLayout
      title="Sign in"
      subtitle="Welcome back. Enter your details to continue."
      footer={<>New to Elosh? <Link to="/auth/register" style={{ color: 'var(--app-accent)' }}>Create an account</Link></>}
    >
      <Form onSubmit={() => navigate('/dashboard/employee')} className="flex flex-col gap-4">
        <FormFieldSet type="email" name="email" label="Email" validation={{ rules: { required: true, email: true } }} />
        <FormFieldSet type="password" name="password" label="Password" validation={{ rules: { required: true } }} />
        <div className="flex items-center justify-between">
          <Checkbox label="Remember me" />
          <Link to="/auth/forgot-password" className="text-[13px]" style={{ color: 'var(--app-accent)' }}>
            Forgot password?
          </Link>
        </div>
        <Button type="submit" color="primary" fullWidth>
          Sign in
        </Button>
      </Form>
    </AuthLayout>
  )
}

export function Register() {
  const navigate = useNavigate()
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start your 14-day trial. No card required."
      footer={<>Already have an account? <Link to="/auth/login" style={{ color: 'var(--app-accent)' }}>Sign in</Link></>}
    >
      <Form onSubmit={() => navigate('/dashboard/employee')} className="flex flex-col gap-4">
        <FormFieldSet type="text" name="name" label="Full name" validation={{ rules: { required: true } }} />
        <FormFieldSet type="email" name="email" label="Work email" validation={{ rules: { required: true, email: true } }} />
        <FormFieldSet type="password" name="password" label="Password" validation={{ rules: { required: true, minLength: 8 } }} />
        <Checkbox label="I agree to the Terms and Privacy Policy" />
        <Button type="submit" color="primary" fullWidth>
          Create account
        </Button>
      </Form>
    </AuthLayout>
  )
}

export function ForgotPassword() {
  return (
    <AuthLayout
      title="Forgot password"
      subtitle="Enter your email and we'll send a reset link."
      footer={<Link to="/auth/login" style={{ color: 'var(--app-accent)' }}>Back to sign in</Link>}
    >
      <Form onSubmit={() => toast.success('Reset link sent')} className="flex flex-col gap-4">
        <FormFieldSet type="email" name="email" label="Email" validation={{ rules: { required: true, email: true } }} />
        <Button type="submit" color="primary" fullWidth>
          Send reset link
        </Button>
      </Form>
    </AuthLayout>
  )
}

export function ResetPassword() {
  const navigate = useNavigate()
  return (
    <AuthLayout title="Set a new password" subtitle="Choose a strong password you don't use elsewhere.">
      <Form onSubmit={() => navigate('/auth/login')} className="flex flex-col gap-4">
        <FormFieldSet type="password" name="password" label="New password" validation={{ rules: { required: true, minLength: 8 } }} />
        <FormFieldSet type="password" name="confirm" label="Confirm password" validation={{ rules: { required: true } }} />
        <Button type="submit" color="primary" fullWidth>
          Update password
        </Button>
      </Form>
    </AuthLayout>
  )
}

export function TwoStep() {
  const navigate = useNavigate()
  return (
    <AuthLayout title="Two-step verification" subtitle="Enter the 6-digit code from your authenticator app.">
      <div className="flex flex-col gap-4">
        <OtpField length={6} aria-label="Verification code" />
        <Button color="primary" fullWidth onPress={() => navigate('/dashboard/employee')}>
          Verify
        </Button>
        <p className="text-center text-[13px]" style={{ color: 'var(--app-fg-muted)' }}>
          Didn't get a code? <button className="font-medium" style={{ color: 'var(--app-accent)' }}>Resend</button>
        </p>
      </div>
    </AuthLayout>
  )
}

export function Lock() {
  const navigate = useNavigate()
  return (
    <AuthLayout title="Locked" subtitle="Enter your password to unlock.">
      <div className="flex flex-col items-center gap-4">
        <Avatar size={64} name="Adrian Park" src="https://i.pravatar.cc/160?img=8" />
        <div className="text-sm font-medium" style={{ color: 'var(--app-fg-strong)' }}>
          Adrian Park
        </div>
        <Form onSubmit={() => navigate('/dashboard/employee')} className="w-full flex flex-col gap-4">
          <FormFieldSet type="password" name="password" label="Password" validation={{ rules: { required: true } }} />
          <Button type="submit" color="primary" fullWidth>
            Unlock
          </Button>
        </Form>
      </div>
    </AuthLayout>
  )
}
