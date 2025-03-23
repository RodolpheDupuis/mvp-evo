"use client"

import React, { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select'
import { Switch } from './ui/switch'
import { Skeleton } from './ui/skeleton'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Button } from './ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from './ui/table'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from './ui/dropdown-menu'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './ui/tooltip'
import { Alert, AlertTitle, AlertDescription } from './ui/alert'
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from './ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronDown, Info, AlertCircle, User, Bell, Settings, LogOut } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Toaster } from './ui/sonner'
import { toast } from 'sonner'

export default function UiShowcase() {
  const t = useTranslations('common')
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [switchValue, setSwitchValue] = useState(false)

  // Form schema
  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
  })

  // Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  })

  // Simulate loading
  const handleLoadClick = () => {
    setIsLoading(true)
    setProgress(0)
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  // Show toast
  const showToast = () => {
    toast("This is a toast notification", {
      description: "Toast notifications are useful for providing feedback",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    })
  }

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-semibold text-blue-600">UI Component Showcase</h2>
      <Toaster />
      
      <Tabs defaultValue="cards">
        <TabsList className="mb-4">
          <TabsTrigger value="cards">Cards & Tables</TabsTrigger>
          <TabsTrigger value="inputs">Inputs & Forms</TabsTrigger>
          <TabsTrigger value="feedback">Feedback & Alerts</TabsTrigger>
          <TabsTrigger value="navigation">Navigation & Menus</TabsTrigger>
        </TabsList>
        
        <TabsContent value="cards" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Cards</h3>
              <Card>
                <CardHeader>
                  <CardTitle>Analytics Dashboard</CardTitle>
                  <CardDescription>View your metrics and performance data.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">Monthly Revenue</span>
                        <Badge variant="success">+12.5%</Badge>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">New Users</span>
                        <Badge variant="info">+24</Badge>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm">View Details</Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Tables</h3>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>A list of your recent transactions.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Subscription</TableCell>
                        <TableCell><Badge variant="success">Completed</Badge></TableCell>
                        <TableCell className="text-right">$49.99</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Template Purchase</TableCell>
                        <TableCell><Badge variant="secondary">Processing</Badge></TableCell>
                        <TableCell className="text-right">$29.99</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Domain Renewal</TableCell>
                        <TableCell><Badge variant="destructive">Failed</Badge></TableCell>
                        <TableCell className="text-right">$12.99</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Avatars</h3>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              
              <Avatar>
                <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              
              <Avatar>
                <AvatarFallback className="bg-blue-600">JD</AvatarFallback>
              </Avatar>
              
              <Avatar>
                <AvatarFallback className="bg-purple-600">AS</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="inputs" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Basic Inputs</h3>
              <div className="space-y-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" id="email" placeholder="Enter your email" />
                </div>
                
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input type="password" id="password" placeholder="Enter your password" />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="notifications" 
                    checked={switchValue} 
                    onCheckedChange={setSwitchValue} 
                  />
                  <Label 
                    htmlFor="notifications" 
                    className="text-sm font-medium leading-none cursor-pointer"
                  >
                    {switchValue ? "Notifications enabled" : "Notifications disabled"}
                  </Label>
                </div>
              </div>
              
              <h3 className="text-lg font-medium mt-8">Select Component</h3>
              <Select>
                <SelectTrigger className="w-full max-w-sm">
                  <SelectValue className="text-white" placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free Plan</SelectItem>
                  <SelectItem value="pro">Pro Plan</SelectItem>
                  <SelectItem value="team">Team Plan</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Form with Validation</h3>
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>Update your account information.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form className="space-y-6">
                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input placeholder="johndoe" {...field} />
                            </FormControl>
                            <FormDescription>
                              This is your public display name.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormDescription>
                              We'll never share your email with anyone else.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit">Update Account</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="feedback" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Progress & Loading</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">File Upload</span>
                    <span className="text-sm">{progress}%</span>
                  </div>
                  <Progress value={progress} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Storage Usage</span>
                    <span className="text-sm">65%</span>
                  </div>
                  <Progress value={65} />
                </div>
                
                <Button onClick={handleLoadClick}>
                  {isLoading ? "Processing..." : "Simulate Progress"}
                </Button>
              </div>
              
              <h3 className="text-lg font-medium mt-8">Loading States</h3>
              <div className="space-y-3">
                {isLoading ? (
                  <>
                    <div className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </div>
                    <Skeleton className="h-[125px] w-full rounded-md" />
                  </>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">John Doe</p>
                      <p className="text-xs text-slate-400">john.doe@example.com</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Alerts & Badges</h3>
              <div className="space-y-4">
                <Alert variant="default">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Information</AlertTitle>
                  <AlertDescription>
                    This is an informational alert to notify you about something important.
                  </AlertDescription>
                </Alert>
                
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    There was an error processing your request. Please try again.
                  </AlertDescription>
                </Alert>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Error</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="info">Info</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
              </div>
              
              <h3 className="text-lg font-medium mt-8">Dialogs & Toasts</h3>
              <div className="space-x-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Open Dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirmation</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to perform this action? This cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-sm text-slate-400">
                        This is additional information about the action you're about to take.
                      </p>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Confirm</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                <Button onClick={showToast}>Show Toast</Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="navigation" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Dropdown Menus</h3>
              <div className="flex space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Open Menu</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Bell className="mr-2 h-4 w-4" />
                      <span>Notifications</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <h3 className="text-lg font-medium mt-8">Tooltips</h3>
              <div className="flex space-x-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">Hover Me</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>This is a tooltip that provides additional information.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Sheet (Slide-out Panel)</h3>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Open Settings Panel</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Application Settings</SheetTitle>
                    <SheetDescription>
                      Configure your application preferences. These settings will be saved automatically.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-6 space-y-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Theme Preferences</h4>
                      <div className="flex items-center space-x-2">
                        <Switch id="dark-mode" />
                        <label htmlFor="dark-mode" className="text-sm">Dark Mode</label>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Notification Settings</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Switch id="email-notif" />
                          <label htmlFor="email-notif" className="text-sm">Email Notifications</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="push-notif" />
                          <label htmlFor="push-notif" className="text-sm">Push Notifications</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              
              <h3 className="text-lg font-medium mt-8">Button Variants</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex gap-2">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                  <Button disabled>Disabled</Button>
                  <Button size="sm">Small</Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
