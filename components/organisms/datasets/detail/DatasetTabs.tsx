import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DATASET_OVERVIEW_MOCKUP } from '@/components/organisms/datasets/detail/fake-markdown-overview'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeRaw from 'rehype-raw'
import rehypeKatex from 'rehype-katex'
import { Table, TableBody } from '@/components/ui/table'
import { DatasetInformation } from './DatasetInformation'
import { DataViewer } from './viewers/DataViewer'
import { FilesViewer } from './viewers/FilesViewer'

interface DatasetTabsProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  dataset: any // TODO: Add proper type
}

export const DatasetTabs = ({ activeTab, setActiveTab, dataset }: DatasetTabsProps) => (
  <Tabs value={activeTab} onValueChange={setActiveTab}>
    <TabsList className="h-[40px] p-1 bg-gray-100 dark:bg-[#2A2A2A] rounded-full flex w-fit border border-gray-200 dark:border-[#3A3A3A]">
      <TabsTrigger 
        value="dataset" 
        className="rounded-l-full px-4 text-[13px] text-gray-600 transition-colors
          data-[state=active]:bg-transparent data-[state=active]:text-blue-500
          hover:text-gray-900 min-w-[80px] border-r border-gray-200 dark:border-[#3A3A3A]
          dark:text-gray-400 dark:data-[state=active]:text-[#0A84FF] dark:hover:text-white"
      >
        Dataset card
      </TabsTrigger>
      <TabsTrigger 
        value="viewer" 
        className="px-4 text-[13px] text-gray-600 transition-colors
          data-[state=active]:bg-transparent data-[state=active]:text-blue-500
          hover:text-gray-900 min-w-[80px] border-r border-gray-200 dark:border-[#3A3A3A]
          dark:text-gray-400 dark:data-[state=active]:text-[#0A84FF] dark:hover:text-white"
      >
        Dataset Viewer
      </TabsTrigger>
      <TabsTrigger 
        value="files"
        className="rounded-r-full px-4 text-[13px] text-gray-600 transition-colors
          data-[state=active]:bg-transparent data-[state=active]:text-blue-500
          hover:text-gray-900 min-w-[80px]
          dark:text-gray-400 dark:data-[state=active]:text-[#0A84FF] dark:hover:text-white"
      >
        Files and versions
      </TabsTrigger>
    </TabsList>
    <TabsContent value="dataset" className="mt-6">
      <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:font-medium prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg">
        <p className="text-gray-600 dark:text-white/70">{dataset.description}</p>
        <div className="mt-6">
          <ReactMarkdown
            className="text-gray-600 dark:text-white/70 markdown"
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeRaw, rehypeKatex]}
            components={{
              table: ({ node, ...props }) => (
                <div className="overflow-x-auto">
                  <Table {...props} className="w-full border-collapse">
                    <TableBody className="[&_tr]:border-b [&_tr]:border-gray-200/50 dark:[&_tr]:border-white/10 [&_td]:p-2 [&_td]:text-sm [&_td]:text-gray-600 dark:[&_td]:text-white/70 [&_th]:p-2 [&_th]:text-sm [&_th]:font-medium [&_th]:text-gray-900 dark:[&_th]:text-white/90 [&_th]:text-left [&_tr:last-child]:border-0">
                      {props.children}
                    </TableBody>
                  </Table>
                </div>
              ),
              pre: ({ node, ...props }) => (
                <pre className="bg-gray-50 dark:bg-white/[0.03] rounded-lg p-4 text-gray-800 dark:text-white/90" {...props} />
              ),
              code(props) {
                const { children, className, node, ...rest } = props
                const match = /language-(\w+)/.exec(className || '')
                return match ? (
                  <pre className="rounded-lg bg-gray-50 dark:bg-white/[0.03] p-4 font-mono text-sm">
                    <code {...rest} className={`${className} text-gray-800 dark:text-white/90`}>
                      {children}
                    </code>
                  </pre>
                ) : (
                  <code {...rest} className={`${className} text-gray-800 dark:text-white/90`}>
                    {children}
                  </code>
                )
              }
            }}
          >
            {DATASET_OVERVIEW_MOCKUP}
          </ReactMarkdown>
        </div>
        <DatasetInformation dataset={dataset} />
      </div>
    </TabsContent>
    <TabsContent value="viewer" className="mt-6">
      <DataViewer dataset={dataset} />
    </TabsContent>
    <TabsContent value="files" className="mt-6">
      <FilesViewer />
    </TabsContent>
  </Tabs>
)
