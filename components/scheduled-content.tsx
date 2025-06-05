import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"

const ScheduledContent = () => {
  const form = useForm()

  return (
    <Form {...form}>
      <div>
        {/* Form elements will go here */}
        <p>Scheduled Content Component</p>
      </div>
    </Form>
  )
}

export default ScheduledContent
