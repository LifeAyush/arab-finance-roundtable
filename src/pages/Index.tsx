import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import logo1 from "@/assets/logo1.png";
import logo2 from "@/assets/logo2.png";

const Index = () => {
  const [agreedToDataUse, setAgreedToDataUse] = useState<string | null>(null);
  const [formHeight, setFormHeight] = useState<number>(0);
  const formContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Verify the message is from Google Forms
      if (event.origin === 'https://docs.google.com') {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'resize' && data.height) {
            setFormHeight(data.height);
          }
        } catch (e) {
          console.error('Error parsing form message:', e);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="w-full bg-[#004159] text-white py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-center mb-6">
            <img
              src="/lovable-uploads/03271f84-58de-497b-8986-cd98efe9e749.png"
              alt="Event Logo"
              className="h-20 md:h-24"
            />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">
            Arab Regional Finance Roundtable 2025
          </h1>
          <div className="mt-8 flex flex-col md:flex-row justify-center items-center md:space-x-12 space-y-4 md:space-y-0">
            <div className="flex items-center">
              <div className="mr-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-lg font-medium">29th April 2025</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="mr-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-lg font-medium">
                  13:30 – 15:30 Gulf Standard Time
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="mr-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-lg font-medium">
                  Level 14, The Gate, Dubai International Finance Centre (DIFC),
                  Dubai
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 text-center">
            Our Partners
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <img
              src={logo1}
              alt="Partner Logo 1"
              className="h-16 md:h-20 object-contain"
            />
            <img
              src={logo2}
              alt="Partner Logo 2"
              className="h-16 md:h-20 object-contain"
            />
          </div>
        </div>
      </section>

      {/* Background Section */}
      <section className="py-12 bg-[#f9f5ed] width-full">
        <div className="container mx-auto px-4 md:px-8 width-[100vw]">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 text-left">
            Background and Context
          </h2>
          <div className="text-gray-700 text-left border border-gray-300 p-4 width-full  custom-class">
            <p className="mb-4 text-left">
              Financing climate solutions in developing countries is critical to
              a just transition, mitigation, adaptation and nature-based
              initiatives. The UN Climate Change High Level Champions launched
              the Regional Platforms for Climate Projects in 2022 to bring
              greater attention to financing climate and SDG solutions in the
              Global South. These platforms bring together UN Member States,
              project developers, public and private finance actors on specific
              climate projects and regionally relevant issues, with a strong
              focus on mobilizing capital, scaling solutions, and de-risking
              investments. The initiative has been supported publicly by the UN
              system and the COP27, COP28 and COP29 Presidencies.
            </p>
            <p className="mb-4 text-left">
              Building on the successes of the 2022 Beirut and 2023 Dubai
              forums, this year's Arab regional finance roundtable, an
              initiative by the UN Climate Change High Level Champions, will
              foster public-private collaboration to help drive climate finance
              in the Arab region. Key takeaways from the roundtable will help
              provide input to the Baku-Belem Roadmap and COP30. The roundtable
              is kindly supported by the Global Ethical Finance Initiative
              (GEFI) and the DIFC.
            </p>
            <p className="mb-4 text-left">
              Serving as a precursor to COP30 in Brazil, the roundtable will
              bring together decision makers and practitioners from finance,
              sustainability and public policy to discuss the global stocktake
              on climate goals, address challenges and explore solutions to
              scaling climate investments in the Arab region, showcase regional
              climate project pipelines, share success stories, and help chart
              financial pathways for country climate plans.
            </p>
          </div>

          <h3 className="text-xl font-bold mt-8 mb-4 text-gray-800">
            Key Objectives:
          </h3>
          <ol className="list-decimal pl-6 space-y-3 text-gray-700 text-left">
            <li>
              <strong>
                Focus on Regionally Relevant Climate Finance Priorities & Global
                Stocktake:
              </strong>{" "}
              Take stock of lessons learned from past and ongoing climate
              finance initiatives in the Arab region, identifying successes,
              challenges, and opportunities for scaling investments.
            </li>
            <li>
              <strong>Mobilizing and De-risking Climate Investments:</strong>{" "}
              Identify practical solutions to accelerate climate finance by
              showcasing high-impact projects, examining what makes them
              bankable, and exploring de-risking mechanisms (e.g., blended
              finance, guarantees, policy reforms) to attract private capital
              and enable large-scale climate projects.
            </li>
            <li>
              <strong>Strengthening Public-Private Partnerships:</strong>{" "}
              Explore how MDBs, development banks, commercial banks, and private
              investors can collaborate more effectively to unlock capital and
              address investment risks.
            </li>
            <li>
              <strong>Driving COP30 Outcomes:</strong> Ensure key insights and
              recommendations from the forum contribute to global discussions on
              climate finance, particularly in preparation for COP30 in Brazil
              in November 2025.
            </li>
          </ol>
        </div>
      </section>

      {/* Agenda Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
            PROVISIONAL AGENDA
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-4 text-center font-semibold border-b border-r border-gray-300 w-1/6">
                    Time
                    <br />
                    (Gulf Standard Time)
                  </th>
                  <th className="py-3 px-4 text-left font-semibold border-b border-gray-300">
                    Session
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3 px-4 border-b border-r border-gray-300 text-center">
                    14:00 - 14:05
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    Welcome remarks
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-3 px-4 border-b border-r border-gray-300 text-center">
                    14:05 - 14:15
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    Roundtable kick-off remarks by Dr. Mahmoud Mohieldin, UN
                    Special Envoy on Financing the 2030 Agenda for Sustainable
                    Development
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b border-r border-gray-300 text-center">
                    14:15 - 14:45
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    Project Showcase: Mobilizing Capital for Climate Sectors in
                    the Arab Region: Practical Solutions
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-3 px-4 border-b border-r border-gray-300 text-center">
                    14:45 – 15:25
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    <p>Roundtable Discussion:</p>
                    <ul className="list-disc pl-5 mt-2">
                      <li>Mobilizing and De-Risking Climate Investments</li>
                      <li>Strengthening Public-Private Partnerships</li>
                      <li>Driving COP30 Outcomes</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b border-r border-gray-300 text-center">
                    15:25 – 15:30
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300">
                    Closing Remarks & Next Steps towards COP30
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-12 bg-[#f9f5ed]" id="registration">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
            REGISTRATION DETAILS
          </h2>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-6">
              <div className="max-w-none text-gray-700 text-left">
                <p className="mb-4 text-left">
                  Your personal data, including name, contact details and
                  administrative information will be collected to facilitate
                  your participation in the event and to implement
                  organizational arrangements, and shared among the organizers
                  and implementation partners namely UN Climate Change High
                  Level Champions (organizer) and SLK Capital (implementation
                  partner). Your personal information will be treated as
                  confidential in accordance with data protection legislation as
                  well as with the terms of this statement.
                </p>
                <p className="text-gray-700 font-semibold text-left">
                  Select "Yes" if you authorize the treatment of your personal
                  information as per the data-use statement.*
                </p>
              </div>
            </div>

            <div className="mt-3">
              <RadioGroup
                value={agreedToDataUse || ""}
                onValueChange={setAgreedToDataUse}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="agreement-yes" />
                  <Label htmlFor="agreement-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="agreement-no" />
                  <Label htmlFor="agreement-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            {agreedToDataUse === "yes" ? (
              <div 
                ref={formContainerRef}
                className="mt-6 transition-all duration-300 relative"
                style={{ 
                  height: formHeight ? `${formHeight}px` : '800px',
                  minHeight: '800px'
                }}
              >
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSf7s80LPbsc5QaGb6-ml51ZW8xiOo82RuGG4rrvlnEwncrWoA/viewform?embedded=true"
                  width="100%"
                  height="100%"
                  className="w-full h-full absolute inset-0 border-0"
                  title="Registration Form"
                >
                  Loading…
                </iframe>
              </div>
            ) : (
              <div className="mt-6 text-center text-gray-600">
                Please agree to the data use statement to access the registration form.
              </div>
            )}
          </div>

          <div className="mt-6 text-center text-gray-600 text-sm">
            <p>
              Registrants will receive a confirmation email when their details
              have been confirmed by the organizers.
            </p>
            <p>Please reach out with any questions or for more information.</p>
            <p className="mt-4">
              For any queries kindly reach out to - sara@slkgroupcapital.com
            </p>
            <div className="mt-4 flex justify-center">
              <img
                src="/lovable-uploads/dfb0ecf5-a3b1-4956-88ba-ec4c9f8b9180.png"
                alt="SLK Capital Logo"
                className="h-12"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
