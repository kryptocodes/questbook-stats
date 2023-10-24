import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useOptimismQuery } from '@/libs/data/optimisim/getAllGrants'
import { usePolygonQuery } from '@/libs/data/polygon/getAllGrants'
import { useCeloQuery } from '@/libs/data/celo/getAllGrants'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const { records } = useOptimismQuery();
  const { records: recordsPolygon } = usePolygonQuery();
  const { records: recordsCelo } = useCeloQuery();

  function convertToMillions(number: number): string {
    return (number / 1e6).toFixed(2) + " million USD";
  }
  
  const getTotalGrants  = () => {
   return (records?.grants?.length ?? 0) + (recordsPolygon?.grants?.length ?? 0) + (recordsCelo?.grants?.length ?? 0);
  }

  const getTotalProposals  = () => {
    return (records?.grants?.map((grant) =>
    grant.numberOfApplications
  )?.reduce((a, b) => a + b, 0) ?? 0) + (recordsPolygon?.grants?.map((grant) =>
    grant.numberOfApplications
  )?.reduce((a, b) => a + b, 0) ?? 0) + (recordsCelo?.grants?.map((grant) =>
    grant.numberOfApplications
  )?.reduce((a, b) => a + b, 0) ?? 0);
  }

  const getTotalMilestones  = () => {
    return (records?.grants?.map((grant) =>
    grant.applications?.map((application) =>
    application.milestones?.length
    )?.reduce((a, b) => a + b, 0)
    )?.reduce((a, b) => a + b, 0) ?? 0) + (recordsPolygon?.grants?.map((grant) =>
      grant.applications?.map((application) =>
      application.milestones?.length
      )?.reduce((a, b) => a + b, 0)
      )?.reduce((a, b) => a + b, 0) ?? 0) + (recordsCelo?.grants?.map((grant) =>
        grant.applications?.map((application) =>
        application.milestones?.length
        )?.reduce((a, b) => a + b, 0)
        )?.reduce((a, b) => a + b, 0) ?? 0);
  }

  const getTotalMilestonesCompleted  = () => {
    return (records?.grants?.map((grant) =>
    grant.applications?.map((application) =>
    application.milestones?.filter((milestone) => milestone.application.state === 'approved' && milestone.amountPaid > 0)).length
    )?.reduce((a, b) => a + b, 0) ?? 0) + (recordsPolygon?.grants?.map((grant) =>
      grant.applications?.map((application) =>
      application.milestones?.filter((milestone) => milestone.application.state === 'approved' && milestone.amountPaid > 0)).length
      )?.reduce((a, b) => a + b, 0) ?? 0) + (recordsCelo?.grants?.map((grant) =>
        grant.applications?.map((application) =>
        application.milestones?.filter((milestone) => milestone.application.state === 'approved' && milestone.amountPaid > 0)).length
        )?.reduce((a, b) => a + b, 0) ?? 0);
  }

  const getTotalGrants50Percent  = () => {
    return (records?.grants?.filter((grant) =>
    grant.applications?.filter((application) =>
    application.milestones?.filter((milestone) => milestone.application.state === 'approved' && milestone.amountPaid > 0)).length >= grant.applications?.flatMap((application) =>
    application.milestones).length / 2).length ?? 0) + (recordsPolygon?.grants?.filter((grant) =>
      grant.applications?.filter((application) =>
      application.milestones?.filter((milestone) => milestone.application.state === 'approved' && milestone.amountPaid > 0)).length >= grant.applications?.flatMap((application) =>
      application.milestones).length / 2).length ?? 0) + (recordsCelo?.grants?.filter((grant) =>
      grant.applications?.filter((application) =>
      application.milestones?.filter((milestone) => milestone.application.state === 'approved' && milestone.amountPaid > 0)).length >= grant.applications?.flatMap((application) =>
      application.milestones).length / 2).length ?? 0);
  }

  const getTotalApplications50Percent = () => {
    const totalApplications = records?.grants
      ?.flatMap((grant) => grant.applications)
      ?.filter((application) => {
        const milestones = application.milestones;
        if (!milestones || milestones.length === 0) return false;
  
        const completedMilestones = milestones.filter(
          (milestone) => milestone.application.state === 'approved' && milestone.amountPaid > 0
        );
  
        return completedMilestones.length >= milestones.length / 2;
      });
  
    const totalApplicationsPolygon = recordsPolygon?.grants
      ?.flatMap((grant) => grant.applications)
      ?.filter((application) => {
        const milestones = application.milestones;
        if (!milestones || milestones.length === 0) return false;
  
        const completedMilestones = milestones.filter(
          (milestone) => milestone.application.state === 'approved' && milestone.amountPaid > 0
        );
  
        return completedMilestones.length >= milestones.length / 2;
      });
  
    const totalApplicationsCelo = recordsCelo?.grants
      ?.flatMap((grant) => grant.applications)
      ?.filter((application) => {
        const milestones = application.milestones;
        if (!milestones || milestones.length === 0) return false;
  
        const completedMilestones = milestones.filter(
          (milestone) => milestone.application.state === 'approved' && milestone.amountPaid > 0
        );
  
        return completedMilestones.length >= milestones.length / 2;
      });
  
    return (
      (totalApplications?.length ?? 0) +
      (totalApplicationsPolygon?.length ?? 0) +
      (totalApplicationsCelo?.length ?? 0)
    );
  };

  const getTotalApplications100Percent = () => {
    const totalApplications = records?.grants
      ?.flatMap((grant) => grant.applications)
      ?.filter((application) => {
        const milestones = application.milestones;
        if (!milestones || milestones.length === 0) return false;
  
        const completedMilestones = milestones.filter(
          (milestone) => milestone.application.state === 'approved' && milestone.amountPaid > 0
        );
  
        return completedMilestones.length === milestones.length;
      });
  
    const totalApplicationsPolygon = recordsPolygon?.grants
      ?.flatMap((grant) => grant.applications)
      ?.filter((application) => {
        const milestones = application.milestones;
        if (!milestones || milestones.length === 0) return false;
  
        const completedMilestones = milestones.filter(
          (milestone) => milestone.application.state === 'approved' && milestone.amountPaid > 0
        );
  
        return completedMilestones.length === milestones.length;
      });
  
    const totalApplicationsCelo = recordsCelo?.grants
      ?.flatMap((grant) => grant.applications)
      ?.filter((application) => {
        const milestones = application.milestones;
        if (!milestones || milestones.length === 0) return false;
  
        const completedMilestones = milestones.filter(
          (milestone) => milestone.application.state === 'approved' && milestone.amountPaid > 0
        );
  
        return completedMilestones.length === milestones.length;
      });
  
    return (
      (totalApplications?.length ?? 0) +
      (totalApplicationsPolygon?.length ?? 0) +
      (totalApplicationsCelo?.length ?? 0)
    );
  };
  
  const getTotalProposalsWithAllMilestonesCompleted = () => {
    const totalProposals = records?.grants
      ?.flatMap((grant) => grant.applications)
      ?.filter((application) => {
        const milestones = application.milestones;
        if (!milestones || milestones.length === 0) return false;
  
        const completedMilestones = milestones.filter(
          (milestone) => milestone.application.state === 'approved' && milestone.amountPaid > 0
        );
  
        return completedMilestones.length === milestones.length;
      });
  
    const totalProposalsPolygon = recordsPolygon?.grants
      ?.flatMap((grant) => grant.applications)
      ?.filter((application) => {
        const milestones = application.milestones;
        if (!milestones || milestones.length === 0) return false;
  
        const completedMilestones = milestones.filter(
          (milestone) => milestone.application.state === 'approved' && milestone.amountPaid > 0
        );
  
        return completedMilestones.length === milestones.length;
      });
  
    const totalProposalsCelo = recordsCelo?.grants
      ?.flatMap((grant) => grant.applications)
      ?.filter((application) => {
        const milestones = application.milestones;
        if (!milestones || milestones.length === 0) return false;
  
        const completedMilestones = milestones.filter(
          (milestone) => milestone.application.state === 'approved' && milestone.amountPaid > 0
        );
  
        return completedMilestones.length === milestones.length;
      });
  
    return (
      (totalProposals?.length ?? 0) +
      (totalProposalsPolygon?.length ?? 0) +
      (totalProposalsCelo?.length ?? 0)
    );
  };
  
  
  

  

  const getTotalGrants100Percent  = () => {
    return (records?.grants?.filter((grant) =>
    grant.applications?.filter((application) =>
    application.milestones?.filter((milestone) => milestone.application.state === 'approved' && milestone.amountPaid > 0)).length == grant.applications?.flatMap((application) =>
    application.milestones).length).length ?? 0) + (recordsPolygon?.grants?.filter((grant) =>
      grant.applications?.filter((application) =>
      application.milestones?.filter((milestone) => milestone.application.state === 'approved' && milestone.amountPaid > 0)).length == grant.applications?.flatMap((application) =>
      application.milestones).length).length ?? 0) + (recordsCelo?.grants?.filter((grant) =>
      grant.applications?.filter((application) =>
      application.milestones?.filter((milestone) => milestone.application.state === 'approved' && milestone.amountPaid > 0)).length == grant.applications?.flatMap((application) =>
      application.milestones).length).length ?? 0);
  }

  const getTotalUsers  = () => {
    return (records?.grants?.map((grant) =>
    grant.applications?.map((application) =>
    application.applicantPublicKey 
    )).flat().filter((value, index, self) => self.indexOf(value) === index).length ?? 0) + (recordsPolygon?.grants?.map((grant) =>
    grant.applications?.map((application) =>
    application.applicantPublicKey 
    )).flat().filter((value, index, self) => self.indexOf(value) === index).length ?? 0) + (recordsCelo?.grants?.map((grant) =>
    grant.applications?.map((application) =>
    application.applicantPublicKey 
    )).flat().filter((value, index, self) => self.indexOf(value) === index).length ?? 0);
  }

 
  const getTotalGrantsDistributed  = () => {
    return (records?.grants?.map((grant) =>
     //@ts-ignore
    parseFloat(grant.totalGrantFundingDisbursedUSD) 
    )?.reduce((a, b) => a + b, 0) ?? 0) + (recordsPolygon?.grants?.
      filter((grant) => grant.id != '0x2a2f81275721581c3dc199e7f1ee03041ec69642')
      ?.map((grant) =>
       //@ts-ignore
      parseFloat(grant.totalGrantFundingDisbursedUSD) 
      )?.reduce((a, b) => a + b, 0) ?? 0) + (recordsCelo?.grants?.map((grant) =>
       //@ts-ignore
      parseFloat(grant.totalGrantFundingDisbursedUSD) 
      )?.reduce((a, b) => a + b, 0) ?? 0);
  }

  const getTotalGrantsCommitted  = () => {
    return (records?.grants?.map((grant) =>
     //@ts-ignore
    parseFloat(grant.totalGrantFundingCommittedUSD) 
    )?.reduce((a, b) => a + b, 0) ?? 0) + (recordsPolygon?.grants
      ?.map((grant) =>
       //@ts-ignore
      parseFloat(grant.totalGrantFundingCommittedUSD) 
      )?.reduce((a, b) => a + b, 0) ?? 0) + (recordsCelo?.grants?.map((grant) =>
       //@ts-ignore
      parseFloat(grant.totalGrantFundingCommittedUSD) 
      )?.reduce((a, b) => a + b, 0) ?? 0);
  }




  

  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 bg-black">
    <h1 className="text-4xl font-bold text-center mb-4">Questbook Stats</h1>
  
    <div className="grid grid-cols-2 gap-4 text-center">
      <div className="p-4 bg-gray-900 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">No of Grants</h2>
        <p className="text-3xl font-bold">{getTotalGrants()}</p>
      </div>
  
      <div className="p-4 bg-gray-900 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">No of Proposals</h2>
        <p className="text-3xl font-bold">{getTotalProposals()}</p>
      </div>
  
      <div className="p-4 bg-gray-900 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">No of Milestones</h2>
        <p className="text-3xl font-bold">{getTotalMilestones()}</p>
      </div>
  
      <div className="p-4 bg-gray-900 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">No of Milestones Completed</h2>
        <p className="text-3xl font-bold">{getTotalMilestonesCompleted()}</p>
      </div>
  
      <div className="p-4 bg-gray-900 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">No of Projects with 50% Milestones Completed</h2>
        <p className="text-3xl font-bold">{getTotalApplications50Percent()}</p>
      </div>
  
      <div className="p-4 bg-gray-900 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">No of Projects with All Milestones Completed</h2>
        <p className="text-3xl font-bold">{getTotalApplications100Percent()}</p>
      </div>
  
      <div className="p-4 bg-gray-900 rounded-lg shadow-md col-span-2">
        <h2 className="text-xl font-semibold">Total Users</h2>
        <p className="text-3xl font-bold">{getTotalUsers()}</p>
      </div>
  
      <div className="p-4 bg-gray-900 rounded-lg shadow-md col-span-2">
        <h2 className="text-xl font-semibold">Total Grants Distributed</h2>
        <p className="text-3xl font-bold">{convertToMillions(getTotalGrantsDistributed())}</p>
      </div>
  
      <div className="p-4 bg-gray-900 rounded-lg shadow-md col-span-2">
        <h2 className="text-2xl font-semibold">Total Grants Committed</h2>
        <p className="text-3xl font-bold">{convertToMillions(getTotalGrantsCommitted())}</p>
      </div>
    </div>
  </main>
  
  )
}
