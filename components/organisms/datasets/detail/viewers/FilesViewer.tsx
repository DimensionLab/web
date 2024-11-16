'use client'

import { useState } from 'react'
import { FolderIcon, FileIcon, ChevronDownIcon, ChevronRightIcon } from 'lucide-react'
import { CodeViewer } from './CodeViewer'

interface FileNode {
  name: string
  type: 'file' | 'folder'
  children?: FileNode[]
  path: string
}

interface FileItemProps {
  node: FileNode
  level: number
  selectedFilePath: string | null
  onFileClick: (path: string) => void
}

const FileItem = ({ node, level, selectedFilePath, onFileClick }: FileItemProps) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const paddingLeft = `${level * 20}px`

  if (node.type === 'file') {
    return (
      <div 
        className={`flex items-center py-1.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/[0.02] ${
          selectedFilePath === node.path ? 'bg-gray-100 dark:bg-white/[0.05]' : ''
        }`} 
        style={{ paddingLeft }}
        onClick={() => onFileClick(node.path)}
      >
        <FileIcon className="w-4 h-4 mr-2 text-gray-400" />
        <span className="text-sm text-gray-700 dark:text-white/70">{node.name}</span>
      </div>
    )
  }

  return (
    <div>
      <div
        className="flex items-center py-1.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/[0.02]"
        style={{ paddingLeft }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <ChevronDownIcon className="w-4 h-4 mr-2 text-gray-400" />
        ) : (
          <ChevronRightIcon className="w-4 h-4 mr-2 text-gray-400" />
        )}
        <FolderIcon className="w-4 h-4 mr-2 text-gray-400" />
        <span className="text-sm font-medium text-gray-800 dark:text-white/90">{node.name}</span>
      </div>
      {isExpanded && node.children?.map((child, index) => (
        <FileItem
          key={child.path}
          node={child}
          level={level + 1}
          selectedFilePath={selectedFilePath}
          onFileClick={onFileClick}
        />
      ))}
    </div>
  )
}

const EXAMPLE_CONTENTS: Record<string, string> = {
  'model_specs.parquet': `// Example model specifications
{
  "model_name": "transformer_xl",
  "hidden_size": 768,
  "num_hidden_layers": 12,
  "num_attention_heads": 12,
  "intermediate_size": 3072,
  "hidden_act": "gelu",
  "hidden_dropout_prob": 0.1,
  "attention_probs_dropout_prob": 0.1,
  "max_position_embeddings": 512,
  "initializer_range": 0.02
}`,
  'layer_configs.json': `{
  "embedding_layer": {
    "vocab_size": 30000,
    "hidden_size": 768,
    "max_position_embeddings": 512,
    "layer_norm_eps": 1e-12
  },
  "attention_layers": {
    "num_attention_heads": 12,
    "attention_head_size": 64,
    "attention_probs_dropout_prob": 0.1
  },
  "feed_forward_layers": {
    "intermediate_size": 3072,
    "hidden_act": "gelu",
    "hidden_dropout_prob": 0.1
  }
}`,
  'training_metrics.csv': `epoch,train_loss,val_loss,learning_rate
1,2.8423,2.7156,0.001
2,2.5167,2.4891,0.001
3,2.2134,2.1988,0.0005
4,1.9876,1.9654,0.0005
5,1.7654,1.7432,0.0001`,
  'inference_metrics.csv': `model_version,latency_ms,throughput_qps,memory_mb
v1.0,125.3,256.7,1024
v1.1,118.6,278.4,1024
v1.2,112.4,298.2,1152
v2.0,98.7,345.6,1280`,
  'papers.json': `{
  "primary_paper": {
    "title": "Attention Is All You Need",
    "authors": ["Vaswani", "Shazeer", "Parmar"],
    "year": 2017,
    "journal": "NeurIPS",
    "citations": 52000
  },
  "related_works": [
    {
      "title": "BERT: Pre-training of Deep Bidirectional Transformers",
      "authors": ["Devlin", "Chang", "Lee"],
      "year": 2018,
      "journal": "NAACL"
    }
  ]
}`,
  'citations.bib': `@inproceedings{vaswani2017attention,
  title={Attention is all you need},
  author={Vaswani, Ashish and Shazeer, Noam and Parmar, Niki and others},
  booktitle={Advances in neural information processing systems},
  pages={5998--6008},
  year={2017}
}

@article{devlin2018bert,
  title={BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding},
  author={Devlin, Jacob and Chang, Ming-Wei and Lee, Kenton and Toutanova, Kristina},
  journal={arXiv preprint arXiv:1810.04805},
  year={2018}
}`
}

export const FilesViewer = () => {
  const [selectedFilePath, setSelectedFilePath] = useState<string | null>(null)
  const [fileContent, setFileContent] = useState<string>('')

  const exampleFiles: FileNode = {
    name: 'dataset',
    type: 'folder',
    path: 'dataset',
    children: [
      {
        name: 'architectures',
        type: 'folder',
        path: 'dataset/architectures',
        children: [
          { name: 'model_specs.parquet', type: 'file', path: 'dataset/architectures/model_specs.parquet' },
          { name: 'layer_configs.json', type: 'file', path: 'dataset/architectures/layer_configs.json' }
        ]
      },
      {
        name: 'performance',
        type: 'folder',
        path: 'dataset/performance',
        children: [
          { name: 'training_metrics.csv', type: 'file', path: 'dataset/performance/training_metrics.csv' },
          { name: 'inference_metrics.csv', type: 'file', path: 'dataset/performance/inference_metrics.csv' }
        ]
      },
      {
        name: 'metadata',
        type: 'folder',
        path: 'dataset/metadata',
        children: [
          { name: 'papers.json', type: 'file', path: 'dataset/metadata/papers.json' },
          { name: 'citations.bib', type: 'file', path: 'dataset/metadata/citations.bib' }
        ]
      }
    ]
  }

  const handleFileClick = (path: string) => {
    const fileName = path.split('/').pop() || ''
    setSelectedFilePath(path)
    // Add a small delay to ensure state updates properly
    setTimeout(() => {
      setFileContent(EXAMPLE_CONTENTS[fileName] || `// No content available for ${fileName}`)
    }, 0)
  }

  const getFileLanguage = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase() || ''
    const languageMap: Record<string, string> = {
      'json': 'json',
      'csv': 'plaintext',
      'parquet': 'json',
      'bib': 'plaintext',
      'txt': 'plaintext',
    }
    return languageMap[extension] || 'plaintext'
  }

  return (
    <div className="flex h-[600px] border rounded-lg dark:border-white/10 bg-[#1E1E1E]">
      <div className="w-1/3 border-r dark:border-white/10">
        <div className="p-4 border-b dark:border-white/10">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">Files</h3>
        </div>
        <div className="p-2 overflow-auto">
          <FileItem
            node={exampleFiles}
            level={0}
            selectedFilePath={selectedFilePath}
            onFileClick={handleFileClick}
          />
        </div>
      </div>

      <div className="flex-1 bg-[#1E1E1E]">
        {selectedFilePath ? (
          <CodeViewer 
            key={selectedFilePath} // Add key to force re-render
            content={fileContent}
            language={getFileLanguage(selectedFilePath)}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-sm text-gray-500 dark:text-white/50">
            Select a file to view its contents
          </div>
        )}
      </div>
    </div>
  )
}
