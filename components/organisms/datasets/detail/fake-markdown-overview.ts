export const DATASET_OVERVIEW_MOCKUP = `
# Neural Network Architecture Dataset

## Overview

This comprehensive dataset contains detailed architectural specifications and performance metrics from 10,000+ neural network models, collected from published research papers between 2019-2023. The dataset provides valuable insights into the evolution of deep learning architectures and their real-world performance characteristics.

## Dataset Structure

### Key Components

1. **Architecture Specifications**
   - Layer configurations
   - Parameter counts
   - Memory requirements
   - Computational complexity (FLOPs)

2. **Performance Metrics**
   - Training time
   - Inference latency
   - Accuracy metrics
   - Resource utilization

3. **Implementation Details**
   - Framework compatibility
   - Hardware requirements
   - Optimization techniques

## Data Format

The dataset is provided in multiple formats:

\`\`\`
dataset/
├── architectures/
│   ├── model_specs.parquet
│   └── layer_configs.json
├── performance/
│   ├── training_metrics.csv
│   └── inference_metrics.csv
└── metadata/
    ├── papers.json
    └── citations.bib
\`\`\`

## Sample KaTeX rendering:

The lift coefficient ($C_L$) is a dimensionless coefficient.

## Sample Entry

Here's an example of a model specification entry:

\`\`\`json
{
  "model_id": "resnet50_v2",
  "total_params": 23.5M,
  "layers": [
    {
      "type": "Conv2D",
      "filters": 64,
      "kernel_size": 7,
      "stride": 2
    }
  ]
}
\`\`\`

## Key Statistics

| Metric | Value |
|--------|--------|
| Total Models | 10,427 |
| Unique Architectures | 3,856 |
| Date Range | 2019-2023 |
| Total Size | 2.3TB |

## Use Cases

### 1. Architecture Research
- Trend analysis in neural network design
- Performance correlation studies
- Architecture search optimization

### 2. Hardware Optimization
- Resource requirement planning
- Hardware-specific optimization
- Power consumption analysis

### 3. Benchmarking
- Model comparison
- Performance baseline establishment
- Hardware evaluation

## Data Collection Methodology

The data collection process involved:

1. **Paper Selection**
   - Systematic review of top ML conferences
   - Focus on architecture innovation
   - Peer-reviewed publications only

2. **Data Extraction**
   - Automated parsing of paper content
   - Manual verification of key metrics
   - Author correspondence for missing data

3. **Validation**
   - Cross-reference with public implementations
   - Reproducibility checks
   - Independent verification

## Quality Assurance

> "The dataset underwent rigorous validation processes to ensure accuracy and reliability of the contained information."

Quality measures include:

- ✓ Automated consistency checks
- ✓ Manual expert review
- ✓ Author verification
- ✓ Community feedback integration

## Known Limitations

1. **Coverage Gaps**
   - Some proprietary architectures excluded
   - Limited coverage of unpublished models
   - Potential regional bias in paper selection

2. **Measurement Variability**
   - Hardware-dependent metrics
   - Implementation-specific variations
   - Environmental factors in performance data

## Citation

If you use this dataset in your research, please cite:

\`\`\`bibtex
@dataset{nnarchive2023,
  title={Neural Network Architecture Dataset},
  author={Smith, J. and Kumar, A. et al.},
  year={2023},
  publisher={ArXiv},
  url={https://arxiv.org/abs/2023.12345}
}
\`\`\`

## Updates and Maintenance

The dataset is updated quarterly with:

- New architecture additions
- Performance metric updates
- Citation information
- Community contributions

## Community Guidelines

### Contributing

1. Fork the repository
2. Add new architecture data
3. Submit pull request with:
   - Source verification
   - Performance metrics
   - Implementation details

### Support

For questions and support:

- 📧 Email: support@nnarchive.org
- 💬 Discord: [NN Archive Community](https://discord.gg/nnarchive)
- 🐦 Twitter: [@NNArchive](https://twitter.com/nnarchive)

## License

This dataset is released under the MIT License. See \`LICENSE.md\` for details.

---

*Last updated: December 2023*
`;