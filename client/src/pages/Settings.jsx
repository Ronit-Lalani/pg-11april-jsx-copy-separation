import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/AuthContext"
import { useToast } from "@/hooks/use-toast"
import {
  User,
  Shield,
  Bell,
  Moon,
  Sun,
  LogOut,
  CreditCard,
  ImagePlus,
  Upload
} from "lucide-react"
import { useTheme } from "@/context/ThemeContext"
import PageTransition from "@/components/ui/page-transition"

const Settings = () => {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("profile")
  const [avatarFile, setAvatarFile] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(null)

  const handleFileChange = e => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setAvatarFile(file)

      // Create preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result)
      }
      reader.readAsDataURL(file)

      toast({
        title: "File selected",
        description: `${file.name} ready to upload`
      })
    }
  }

  const handleUploadAvatar = () => {
    // In a real app, you would upload the file to a server here
    if (avatarFile) {
      toast({
        title: "Profile picture updated",
        description: "Your profile picture has been updated successfully."
      })
    } else {
      toast({
        title: "No file selected",
        description: "Please select a file first.",
        variant: "destructive"
      })
    }
  }

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully."
    })
  }

  const handlePasswordChange = () => {
    toast({
      title: "Password updated",
      description: "Your password has been updated successfully."
    })
  }

  const handleNotificationToggle = () => {
    toast({
      title: "Notification preferences updated",
      description: "Your notification preferences have been saved."
    })
  }

  return (
    <PageTransition>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">
          Account Settings
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-3">
            <div className="sticky top-20">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative mb-4">
                      <div className="w-24 h-24 rounded-full overflow-hidden bg-primary/20 border-4 border-background shadow-md">
                        {avatarPreview ? (
                          <img
                            src={avatarPreview}
                            alt="Profile Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-primary text-2xl font-bold">
                            {user?.name?.charAt(0) || "U"}
                          </div>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-background shadow-md"
                        onClick={() =>
                          document.getElementById("avatar-upload")?.click()
                        }
                      >
                        <ImagePlus className="h-4 w-4" />
                        <input
                          type="file"
                          id="avatar-upload"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </Button>
                    </div>

                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
                      {user?.name || "User Name"}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {user?.email || "user@example.com"}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <button
                      onClick={() => setActiveTab("profile")}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left ${
                        activeTab === "profile"
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </button>

                    <button
                      onClick={() => setActiveTab("security")}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left ${
                        activeTab === "security"
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      <Shield className="h-4 w-4" />
                      <span>Security</span>
                    </button>

                    <button
                      onClick={() => setActiveTab("notifications")}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left ${
                        activeTab === "notifications"
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      <Bell className="h-4 w-4" />
                      <span>Notifications</span>
                    </button>

                    <button
                      onClick={() => setActiveTab("payment")}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left ${
                        activeTab === "payment"
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      <CreditCard className="h-4 w-4" />
                      <span>Payment Methods</span>
                    </button>

                    <button
                      onClick={() => setActiveTab("appearance")}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left ${
                        activeTab === "appearance"
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      {theme === "dark" ? (
                        <Moon className="h-4 w-4" />
                      ) : (
                        <Sun className="h-4 w-4" />
                      )}
                      <span>Appearance</span>
                    </button>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border">
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={logout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="md:col-span-9">
            {activeTab === "profile" && (
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal information and how others see you on
                    the platform
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        defaultValue={user?.name || ""}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        defaultValue={user?.username || ""}
                        placeholder="Enter your username"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue={user?.email || ""}
                        placeholder="Enter your email"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        defaultValue="+91 98765 43210"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      rows={4}
                      className="w-full px-3 py-2 rounded-md border border-input bg-transparent"
                      placeholder="Tell others a bit about yourself"
                      defaultValue="I'm looking for a comfortable PG accommodation near my workplace."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      defaultValue="123 Main Street, Bangalore"
                      placeholder="Enter your address"
                    />
                  </div>

                  <div className="border-t border-border pt-6">
                    <h3 className="text-lg font-medium mb-4">
                      Profile Picture
                    </h3>

                    <div className="flex flex-col sm:flex-row items-center gap-6 mb-4">
                      <div className="w-32 h-32 rounded-full overflow-hidden bg-primary/20 flex-shrink-0">
                        {avatarPreview ? (
                          <img
                            src={avatarPreview}
                            alt="Profile Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-primary text-4xl font-bold">
                            {user?.name?.charAt(0) || "U"}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 space-y-4">
                        <div className="text-sm text-muted-foreground">
                          <p>
                            Upload a new profile picture. Recommended size:
                            300x300px.
                          </p>
                          <p>Supported formats: JPG, PNG, GIF (max 2MB)</p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Button
                            variant="outline"
                            onClick={() =>
                              document.getElementById("avatar-input")?.click()
                            }
                            className="gap-2"
                          >
                            <Upload className="h-4 w-4" />
                            Choose File
                            <input
                              type="file"
                              id="avatar-input"
                              className="hidden"
                              accept="image/*"
                              onChange={handleFileChange}
                            />
                          </Button>

                          <Button
                            variant="default"
                            onClick={handleUploadAvatar}
                            disabled={!avatarFile}
                          >
                            Upload
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleSaveProfile}>Save Changes</Button>
                </CardFooter>
              </Card>
            )}

            {activeTab === "security" && (
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your password and account security settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Change Password</h3>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">
                          Current Password
                        </Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          placeholder="Enter your current password"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          placeholder="Enter your new password"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">
                          Confirm New Password
                        </Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm your new password"
                        />
                      </div>

                      <Button onClick={handlePasswordChange}>
                        Update Password
                      </Button>
                    </div>
                  </div>

                  <div className="border-t border-border pt-6 space-y-4">
                    <h3 className="text-lg font-medium">
                      Two-Factor Authentication
                    </h3>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">
                          Enable Two-Factor Authentication
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Switch id="2fa" />
                    </div>
                  </div>

                  <div className="border-t border-border pt-6 space-y-4">
                    <h3 className="text-lg font-medium">Login Sessions</h3>

                    <div className="space-y-4">
                      <div className="p-4 border border-border rounded-md">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Current Session</p>
                            <p className="text-sm text-muted-foreground">
                              Chrome on Windows • IP: 157.49.xx.xx
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Started: June 1, 2023 at 10:24 AM
                            </p>
                          </div>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                            Active
                          </Badge>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full">
                        Sign Out From All Devices
                      </Button>
                    </div>
                  </div>

                  <div className="border-t border-border pt-6 space-y-4">
                    <h3 className="text-lg font-medium">Connected Accounts</h3>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-[#4285F4] text-white p-2">
                            <svg
                              className="h-5 w-5"
                              aria-hidden="true"
                              focusable="false"
                              data-icon="google"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 488 512"
                            >
                              <path
                                fill="currentColor"
                                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                              ></path>
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium">Google</p>
                            <p className="text-sm text-muted-foreground">
                              Sign in with your Google account
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Connect
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-[#1877F2] text-white p-2">
                            <svg
                              className="h-5 w-5"
                              aria-hidden="true"
                              focusable="false"
                              data-icon="facebook"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                            >
                              <path
                                fill="currentColor"
                                d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
                              ></path>
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium">Facebook</p>
                            <p className="text-sm text-muted-foreground">
                              Sign in with your Facebook account
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Connect
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "notifications" && (
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Control how and when you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label
                            htmlFor="email-bookings"
                            className="font-medium"
                          >
                            Booking Updates
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications about your booking status
                            changes
                          </p>
                        </div>
                        <Switch id="email-bookings" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label
                            htmlFor="email-payments"
                            className="font-medium"
                          >
                            Payment Reminders
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified about upcoming rent and other payments
                          </p>
                        </div>
                        <Switch id="email-payments" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label
                            htmlFor="email-messages"
                            className="font-medium"
                          >
                            New Messages
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications about new messages from owners
                            or tenants
                          </p>
                        </div>
                        <Switch id="email-messages" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label
                            htmlFor="email-marketing"
                            className="font-medium"
                          >
                            Marketing Communications
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Receive promotional offers, updates, and newsletters
                          </p>
                        </div>
                        <Switch id="email-marketing" />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border pt-6 space-y-4">
                    <h3 className="text-lg font-medium">SMS Notifications</h3>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="sms-bookings" className="font-medium">
                            Booking Updates
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Receive SMS notifications about your booking status
                            changes
                          </p>
                        </div>
                        <Switch id="sms-bookings" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="sms-payments" className="font-medium">
                            Payment Reminders
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Get SMS notifications about upcoming rent and other
                            payments
                          </p>
                        </div>
                        <Switch id="sms-payments" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="ml-auto"
                    onClick={handleNotificationToggle}
                  >
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            )}

            {activeTab === "payment" && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>
                    Manage your payment methods and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <h3 className="text-lg font-medium">Your Payment Methods</h3>

                  <div className="space-y-4">
                    <div className="p-4 border border-border rounded-md">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 p-2 rounded-md">
                            <CreditCard className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">HDFC Credit Card</p>
                            <p className="text-sm text-muted-foreground">
                              **** **** **** 4321
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Expires: 12/25
                            </p>
                          </div>
                        </div>
                        <Badge>Default</Badge>
                      </div>
                    </div>

                    <div className="p-4 border border-border rounded-md">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 p-2 rounded-md">
                            <CreditCard className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">SBI Debit Card</p>
                            <p className="text-sm text-muted-foreground">
                              **** **** **** 8765
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Expires: 08/24
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Set Default
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="gap-2">
                    <CreditCard className="h-4 w-4" />
                    Add New Payment Method
                  </Button>

                  <div className="border-t border-border pt-6 space-y-4">
                    <h3 className="text-lg font-medium">Billing Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="billing-name">Name on Billing</Label>
                        <Input
                          id="billing-name"
                          defaultValue={user?.name || ""}
                          placeholder="Enter name as on billing"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="billing-email">Billing Email</Label>
                        <Input
                          id="billing-email"
                          type="email"
                          defaultValue={user?.email || ""}
                          placeholder="Enter billing email"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="billing-address">Billing Address</Label>
                        <Input
                          id="billing-address"
                          defaultValue="123 Main Street"
                          placeholder="Enter billing address"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="billing-city">City</Label>
                        <Input
                          id="billing-city"
                          defaultValue="Bangalore"
                          placeholder="Enter city"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto">Save Changes</Button>
                </CardFooter>
              </Card>
            )}

            {activeTab === "appearance" && (
              <Card>
                <CardHeader>
                  <CardTitle>Appearance Settings</CardTitle>
                  <CardDescription>
                    Customize the appearance of the application
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Theme</h3>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Dark Mode</p>
                        <p className="text-sm text-muted-foreground">
                          Switch between light and dark mode
                        </p>
                      </div>
                      <Switch
                        id="dark-mode"
                        checked={theme === "dark"}
                        onCheckedChange={toggleTheme}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default Settings
