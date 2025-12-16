import IssueForm from "@/components/IssueForm";
import IssueList from "@/components/IssueList";
import AISummary from "@/components/AISummary";
import LogoutButton from "@/components/LogoutButton";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Top Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Issue Dashboard
            </h1>
            <p className="text-sm text-gray-500">
              Manage and track your reported issues
            </p>
          </div>
          <LogoutButton />
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Create Issue */}
          <section className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold mb-3">
              Create Issue
            </h2>
            <IssueForm />
          </section>

          {/* Issue List */}
          <section className="bg-white rounded-2xl shadow p-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">
                Your Issues
              </h2>
              <span className="text-sm text-gray-500">
                Recent first
              </span>
            </div>
            <IssueList />
          </section>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          
          {/* AI Summary */}
          <section className="bg-white rounded-2xl shadow p-6 sticky top-6">
            <h2 className="text-lg font-semibold mb-3">
              AI Summary
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Generate quick insights from all issues
            </p>
            <AISummary />
          </section>

        </div>
      </main>
    </div>
  );
}
