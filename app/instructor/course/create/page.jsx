"use client";
import Stepper, { Step } from "@/components/react-bits/Stepper";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { basicInfoSchema } from "./Validation";
import BasicInfoStep from "./BasicInfoStep";
import RequirementsStep from "./RequirementsStep";
import OutcomeStep from "./OutcomesStep";
import TargetAudienceStep from "./TargetAudienceStep";
import { useCourseStore } from "@/store/useCourseStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CourseCreationStepper() {
  const {courseData, resetCourseData} = useCourseStore();
  const router = useRouter();

  const methods = useForm({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      language: "",
      level: "",
      price_level_id: 1,
      topic_id: null,
    },
  });

  
  const handleStepChange = async (step) => {
    if (step === 1){
      const isValid = await methods.trigger();
      if (!isValid){
        return false
      }
    }else if (step === 4) {
      const isValid = await methods.trigger();
      if (!isValid){
        toast.error("Please Complete all the fields before submitting.")
        return false
      }
    }

    //console.log(`Navigating to step ${step}`);
    return true
  };


  const handleFinalStep = async () => {
    const requestBody = {
      title: courseData.title,
      subtitle: courseData.subtitle,
      description: courseData.description,
      language: courseData.language,
      level: courseData.level,
      price_id: courseData.price_level_id,
      topic: courseData.topic || null,
      status: 0,
      details: [
        ...courseData.requirements.map((req) => ({
          detail_type: "requirement",
          description: req,
        })),
        ...courseData.outcome.map((out) => ({
          detail_type: "outcome",
          description: out,
        })),
        ...courseData.targetAudience.map((aud) => ({
          detail_type: "target_audience",
          description: aud,
        })),
      ],
    };
  
    try {
      const response = await fetch("/api/instructor/course/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to create course");
      }
      // clear store after successfull submission
      resetCourseData();

      toast.success("Course Created Successfully and saved as draft")
      console.log("Course created successfully:", responseData);
      // TODO: Redirect or show success message
      router.push('/instructor/course')
    } catch (error) {
      console.error("Error:", error.message);
      toast.error(error.message || "Something went wrong. Please try later.")
    }
  };
  

  return (
    <>
      <div className="min-h-screen max-sm:py-3 max-lg:px-1 py-2 mx-auto max-w-7xl lg:px-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold max-sm:text-xl">
              Create a New Course
            </h1>
          </div>
        </div>
        <Stepper
          initialStep={1}
          onStepChange={handleStepChange}
          onFinalStepCompleted={handleFinalStep}
          backButtonText="Previous"
          nextButtonText="Next"
          stepCircleContainerClassName="sm:max-w-full border-2 rounded-lg shadow-md"
          className="flex flex-1 flex-col items-center py-4"
        >
          <Step>
            <hr />
            <div className="flex pt-3 justify-between">
              <h2 className="text-bold text-md lg:text-xl">
                Basic Information
              </h2>
            </div>
            <div>
              <FormProvider {...methods}>
                <BasicInfoStep />
              </FormProvider>
            </div>
          </Step>
          <Step>
            <hr />
            <div className="flex pt-3 justify-between">
              <h2 className="text-bold text-md lg:text-xl">
                Requirements
              </h2>
            </div>
            <div>
              <RequirementsStep />
            </div>
            
          </Step>
          <Step>
            <hr />
            <div className="flex pt-3 justify-between">
              <h2 className="text-bold text-md lg:text-xl">
                Outcomes
              </h2>
            </div>
            <div>
              <OutcomeStep />
            </div>
            
          </Step>
          <Step>
            <hr />
            <div className="flex pt-3 justify-between">
              <h2 className="text-bold text-md lg:text-xl">
                Target Audience
              </h2>
            </div>
            <div>
              <TargetAudienceStep />
            </div>
          </Step>
        </Stepper>
      </div>
    </>
  );
}
