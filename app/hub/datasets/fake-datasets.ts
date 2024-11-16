import { IDataset } from "@/components/organisms/datasets/DatasetsList";

export const mockDatasets: IDataset[] = [
    {
        id: 1,
        name: "Building Energy Consumption Patterns",
        description: "Comprehensive dataset of energy usage patterns across 500+ commercial buildings, including HVAC systems, lighting, and occupancy data. Perfect for energy optimization and sustainable building management.",
        industry: "AEC",
        format: "csv",
        size: 15000,
        updatedAt: Date.now() - 2 * 60 * 60 * 1000,
        views: 12430,
        downloads: 892,
        likes: 345,
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c",
        owner: {
            id: "8f7b5e9a-3c4d-4b2e-9f8a-1b2c3d4e5f6a",
            name: "Sustainable Building Solutions Corp",
            avatarUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=SBS",
            type: "organization"
        }
    },
    {
        id: 2,
        name: "Aircraft Engine Sensor Readings",
        description: "High-frequency sensor data from GE90 aircraft engines, including temperature, pressure, and vibration measurements across 10,000 flight hours.",
        industry: "Aerospace",
        format: "parquet",
        size: 250000,
        updatedAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
        views: 45230,
        downloads: 2891,
        likes: 1203,
        image: "https://images.unsplash.com/photo-1559083156-7c13d56e1e87",
        owner: {
            id: "7a1b2c3d-4e5f-6g7h-8i9j-0k1l2m3n4o5p",
            name: "AeroTech Research Institute",
            avatarUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=ATRI",
            type: "organization"
        }
    },
    {
        id: 3,
        name: "Automotive Crash Test Results",
        description: "Detailed crash test data from various vehicle models, including deformation patterns, impact forces, and safety ratings. Essential for vehicle safety design.",
        industry: "Automotive",
        format: "json",
        size: 75000,
        updatedAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
        views: 28150,
        downloads: 1567,
        likes: 892,
        image: "https://images.unsplash.com/photo-1504215680853-026ed2a45def",
        owner: {
            id: "2c3d4e5f-6g7h-8i9j-0k1l-2m3n4o5p6q7r",
            name: "Dr. Marcus Schmidt",
            avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=MSchmidt",
            type: "person"
        }
    },
    {
        id: 4,
        name: "Consumer Electronics Failure Analysis",
        description: "Comprehensive dataset of failure modes and reliability testing results for consumer electronics components, including smartphones and laptops.",
        industry: "Electronics",
        format: "csv",
        size: 180000,
        updatedAt: Date.now() - 12 * 60 * 60 * 1000,
        views: 19420,
        downloads: 2103,
        likes: 567,
        image: "https://images.unsplash.com/photo-1498049794561-7780e7231661",
        owner: {
            id: "3d4e5f6g-7h8i-9j0k-1l2m-3n4o5p6q7r8s",
            name: "Electronic Reliability Labs",
            avatarUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=ERL",
            type: "organization"
        }
    },
    {
        id: 5,
        name: "Wind Turbine Performance Metrics",
        description: "Operational data from offshore wind farms, including power output, wind conditions, and maintenance records spanning 5 years.",
        industry: "Energy",
        format: "parquet",
        size: 320000,
        updatedAt: Date.now() - 5 * 60 * 60 * 1000,
        views: 31240,
        downloads: 1842,
        likes: 976,
        image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7",
        owner: {
            id: "4e5f6g7h-8i9j-0k1l-2m3n4o5p6q7r8s9t",
            name: "Renewable Energy Solutions Ltd",
            avatarUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=RES",
            type: "organization"
        }
    },
    {
        id: 6,
        name: "Medical Device Testing Results",
        description: "Clinical trial data for various medical devices, including patient outcomes, device performance metrics, and safety assessments.",
        industry: "Life Sciences & Healthcare",
        format: "csv",
        size: 92000,
        updatedAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
        views: 25670,
        downloads: 1234,
        likes: 678,
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
        owner: {
            id: "5f6g7h8i-9j0k-1l2m-3n4o5p6q7r8s9t0u",
            name: "Medical Research Institute",
            avatarUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=MRI",
            type: "organization"
        }
    },
    {
        id: 7,
        name: "Industrial Robot Performance Data",
        description: "Detailed performance metrics from industrial robotic systems, including precision measurements, cycle times, and quality control data.",
        industry: "Manufacturing",
        format: "json",
        size: 15_000_000_000_000,
        updatedAt: Date.now() - 4 * 60 * 60 * 1000,
        views: 42310,
        downloads: 3201,
        likes: 1432,
        image: "https://images.unsplash.com/photo-1565690875712-c08c6d328096",
        owner: {
            id: "6g7h8i9j-0k1l-2m3n4o5p6q7r8s9t0u1v",
            name: "Robotics Technology Corp",
            avatarUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=RTC",
            type: "organization"
        }
    },
    {
        id: 8,
        name: "Construction Site Safety Incidents",
        description: "Anonymized incident reports and safety metrics from major construction projects, including risk assessments and preventive measures.",
        industry: "AEC",
        format: "csv",
        size: 4500000,
        updatedAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
        views: 15780,
        downloads: 892,
        likes: 445,
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5",
        owner: {
            id: "8f7b5e9a-3c4d-4b2e-9f8a-1b2c3d4e5f6a",
            name: "Alexandra Foster",
            avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=AFoster",
            type: "person"
        }
    },
    {
        id: 9,
        name: "Satellite Component Reliability",
        description: "Testing and performance data for satellite components, including environmental stress testing and long-term reliability metrics.",
        industry: "Aerospace",
        format: "HDF5",
        size: 280000000,
        updatedAt: Date.now() - 6 * 60 * 60 * 1000,
        views: 38920,
        downloads: 2567,
        likes: 1123,
        image: "https://images.unsplash.com/photo-1516849677043-ef67c9557e16",
        owner: {
            id: "8i9j0k1l-2m3n4o5p6q7r8s9t0u1v2w3x",
            name: "Aerospace Research Institute",
            avatarUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=ARI",
            type: "organization"
        }
    },
    {
        id: 10,
        name: "EV Battery Performance Analysis",
        description: "Comprehensive dataset on electric vehicle battery performance, including charging cycles, temperature effects, and degradation patterns.",
        industry: "Automotive",
        format: "parquet",
        size: 420000000,
        updatedAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
        views: 52340,
        downloads: 4123,
        likes: 1876,
        image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7",
        owner: {
            id: "9j0k1l2m-3n4o5p6q7r8s9t0u1v2w3x4y",
            name: "Automotive Battery Solutions Ltd",
            avatarUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=ABS",
            type: "organization"
        }
    },
    {
        id: 11,
        name: "Semiconductor Manufacturing Yield",
        description: "Production yield data from semiconductor manufacturing processes, including process parameters and quality control metrics.",
        industry: "Electronics",
        format: "csv",
        size: 195000000,
        updatedAt: Date.now() - 3 * 60 * 60 * 1000,
        views: 29840,
        downloads: 1678,
        likes: 789,
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
        owner: {
            id: "7a1b2c3d-4e5f-6g7h-8i9j-0k1l2m3n4o5p",
            name: "Michael Zhang",
            avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=MZhang",
            type: "person"
        }
    },
    {
        id: 12,
        name: "Solar Panel Efficiency Data",
        description: "Performance data from various solar panel installations, including weather impacts, degradation rates, and energy generation metrics.",
        industry: "Energy",
        format: "json",
        size: 165000000,
        updatedAt: Date.now() - 8 * 60 * 60 * 1000,
        views: 41230,
        downloads: 2891,
        likes: 1345,
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276",
        owner: {
            id: "7a1b2c3d-4e5f-6g7h-8i9j-0k1l2m3n4o5p",
            name: "Michael Zhang",
            avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=MZhang",
            type: "person"
        }
    },
    {
        id: 13,
        name: "Pharmaceutical Equipment Validation",
        description: "Equipment validation data from pharmaceutical manufacturing, including cleaning validation and process verification results.",
        industry: "Life Sciences & Healthcare",
        format: "csv",
        size: 82_000_000_000,
        updatedAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
        views: 18670,
        downloads: 945,
        likes: 432,
        image: "https://images.unsplash.com/photo-1563213126-a4273aed2016",
        owner: {
            id: "2m3n4o5p-6q7r8s9t0u1v2w3x4y5z6a7b",
            name: "Pharmaceutical Quality Assurance Ltd",
            avatarUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=PQA",
            type: "organization"
        }
    },
    {
        id: 14,
        name: "CNC Machine Performance Metrics",
        description: "Operational data from CNC machines, including tool wear patterns, precision measurements, and maintenance records.",
        industry: "Manufacturing",
        format: "parquet",
        size: 230000000,
        updatedAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
        views: 35780,
        downloads: 2456,
        likes: 987,
        image: "https://images.unsplash.com/photo-1565087170449-fa23854a6100",
        owner: {
            id: "3n4o5p6q-7r8s9t0u1v2w3x4y5z6a7b8c",
            name: "Precision Manufacturing Solutions Ltd",
            avatarUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=PMS",
            type: "organization"
        }
    },
    {
        id: 15,
        name: "Building Information Models",
        description: "Structured data from BIM models, including spatial relationships, material properties, and cost estimation metrics.",
        industry: "AEC",
        format: "json",
        size: 128000,
        updatedAt: Date.now() - 4 * 24 * 60 * 60 * 1000,
        views: 2234000,
        downloads: 1234,
        likes: 567,
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
        owner: {
            id: "4o5p6q7r-8s9t0u1v2w3x4y5z6a7b8c9d",
            name: "Building Information Modeling Solutions Ltd",
            avatarUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=BIMS",
            type: "organization"
        }
    },
    {
        id: 16,
        name: "Aircraft Maintenance Records",
        description: "Historical maintenance data from commercial aircraft, including component replacements, inspection results, and service intervals.",
        industry: "Aerospace",
        format: "csv",
        size: 175000,
        updatedAt: Date.now() - 1 * 7 * 24 * 60 * 60 * 1000,
        views: 31240,
        downloads: 1897,
        likes: 876,
        image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1",
        owner: {
            id: "5p6q7r8s-9t0u1v2w3x4y5z6a7b8c9d0e",
            name: "Aerospace Maintenance Solutions Ltd",
            avatarUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=AMS",
            type: "organization"
        }
    },
    {
        id: 17,
        name: "Vehicle Emissions Testing",
        description: "Comprehensive emissions test data from various vehicle models under different operating conditions.",
        industry: "Automotive",
        format: "parquet",
        size: 295000,
        updatedAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
        views: 42670,
        downloads: 3124,
        likes: 1432,
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
        owner: {
            id: "6q7r8s9t-0u1v2w3x4y5z6a7b8c9d0e1f",
            name: "Automotive Emission Testing Solutions Ltd",
            avatarUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=AETS",
            type: "organization"
        }
    },
    {
        id: 18,
        name: "PCB Manufacturing Defects",
        description: "Quality control data from PCB manufacturing, including defect types, locations, and root cause analysis.",
        industry: "Electronics",
        format: "json",
        size: 145000,
        updatedAt: Date.now() - 6 * 24 * 60 * 60 * 1000,
        views: 25890,
        downloads: 1567,
        likes: 678,
        image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6",
        owner: {
            id: "7r8s9t0u-1v2w3x4y5z6a7b8c9d0e1f2g",
            name: "Electronics Quality Assurance Ltd",
            avatarUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=EQA",
            type: "organization"
        }
    },
    {
        id: 19,
        name: "Smart Grid Performance Data",
        description: "Operational metrics from smart grid deployments, including power quality, demand response, and grid stability indicators.",
        industry: "Energy",
        format: "csv",
        size: 385000,
        updatedAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
        views: 48920,
        downloads: 3567,
        likes: 1654,
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e",
        owner: {
            id: "8s9t0u1v-2w3x4y5z6a7b8c9d0e1f2g3h",
            name: "Smart Grid Solutions Ltd",
            avatarUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=SGS",
            type: "organization"
        }
    },
    {
        id: 20,
        name: "Medical Imaging Equipment Data",
        description: "Performance and calibration data from medical imaging equipment, including MRI, CT, and X-ray machines.",
        industry: "Life Sciences & Healthcare",
        format: "HDF5",
        size: 420000,
        updatedAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
        views: 35670,
        downloads: 2345,
        likes: 987,
        image: "https://images.unsplash.com/photo-1516549655169-df83a0774514",
        owner: {
            id: "3d4e5f6g-7h8i-9j0k-1l2m-3n4o5p6q7r8s",
            name: "Prof. Elena Rodriguez",
            avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=ERodriguez",
            type: "person"
        }
    },
    {
        id: 21,
        name: "Assembly Line Optimization",
        description: "Production line performance data, including cycle times, quality metrics, and resource utilization rates.",
        industry: "Manufacturing",
        format: "parquet",
        size: 265000,
        updatedAt: Date.now() - 4 * 24 * 60 * 60 * 1000,
        views: 39840,
        downloads: 2789,
        likes: 1234,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
        owner: {
            id: "0u1v2w3x-4y5z6a7b8c9d0e1f2g3h4i5j",
            name: "Manufacturing Optimization Solutions Ltd",
            avatarUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=MOS",
            type: "organization"
        }
    },
    {
        id: 22,
        name: "Structural Health Monitoring",
        description: "Sensor data from building structural monitoring systems, including vibration, strain, and displacement measurements.",
        industry: "AEC",
        format: "csv",
        size: 195000,
        updatedAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
        views: 28760,
        downloads: 1678,
        likes: 789,
        image: "https://images.unsplash.com/photo-1590674899484-13da503b7cbd",
        owner: {
            id: "1v2w3x4y-5z6a7b8c9d0e1f2g3h4i5j6k",
            name: "Structural Health Monitoring Solutions Ltd",
            avatarUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=SHMS",
            type: "organization"
        }
    },
    {
        id: 23,
        name: "Drone Flight Test Data",
        description: "Flight test data from commercial drones, including telemetry, control system responses, and environmental conditions.",
        industry: "Aerospace",
        format: "json",
        size: 158000,
        updatedAt: Date.now() - 1 * 7 * 24 * 60 * 60 * 1000,
        views: 32450,
        downloads: 2123,
        likes: 934,
        image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e",
        owner: {
            id: "2w3x4y5z-6a7b8c9d0e1f2g3h4i5j6k7l",
            name: "Aerospace Testing Solutions Ltd",
            avatarUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=ATS",
            type: "organization"
        }
    },
    {
        id: 24,
        name: "Automotive Paint Quality Control",
        description: "Quality control data from automotive painting processes, including color matching, thickness measurements, and defect analysis.",
        industry: "Automotive",
        format: "csv",
        size: 112000,
        updatedAt: Date.now() - 6 * 24 * 60 * 60 * 1000,
        views: 21780,
        downloads: 1234,
        likes: 567,
        image: "https://images.unsplash.com/photo-1565689157206-0fddef7589a2",
        owner: {
            id: "3x4y5z6a-7b8c9d0e1f2g3h4i5j6k7l8m",
            name: "Automotive Quality Assurance Ltd",
            avatarUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=AQA",
            type: "organization"
        }
    },
    {
        id: 25,
        name: "Semiconductor Process Control",
        description: "Statistical process control data from semiconductor manufacturing, including key process indicators and yield metrics.",
        industry: "Electronics",
        format: "parquet",
        size: 285000,
        updatedAt: Date.now() - 4 * 24 * 60 * 60 * 1000,
        views: 45670,
        downloads: 3456,
        likes: 1567,
        image: "https://images.unsplash.com/photo-1601132359864-c974e79890ac",
        owner: {
            id: "4y5z6a7b-8c9d0e1f2g3h4i5j6k7l8m9n",
            name: "Semiconductor Process Control Solutions Ltd",
            avatarUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=SPCS",
            type: "organization"
        }
    },
    {
        id: 26,
        name: "Battery Storage Performance",
        description: "Performance data from grid-scale battery storage systems, including charge/discharge cycles and efficiency metrics.",
        industry: "Energy",
        format: "json",
        size: 225000,
        updatedAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
        views: 38920,
        downloads: 2678,
        likes: 1123,
        image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7",
        owner: {
            id: "5z6a7b8c-9d0e1f2g3h4i5j6k7l8m9n0o",
            name: "Energy Storage Solutions Ltd",
            avatarUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=ESS",
            type: "organization"
        }
    },
    {
        id: 27,
        name: "Bioprocess Manufacturing Data",
        description: "Process data from biopharmaceutical manufacturing, including fermentation parameters and product quality attributes.",
        industry: "Life Sciences & Healthcare",
        format: "csv",
        size: 165000,
        updatedAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
        views: 29840,
        downloads: 1789,
        likes: 876,
        image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69",
        owner: {
            id: "6a7b8c9d-0e1f2g3h4i5j6k7l8m9n0o1p",
            name: "Biotechnology Solutions Ltd",
            avatarUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=BTS",
            type: "organization"
        }
    },
    {
        id: 28,
        name: "Quality Control Vision System",
        description: "Image processing data from automated quality control systems, including defect detection and classification results.",
        industry: "Manufacturing",
        format: "HDF5",
        size: 520000,
        updatedAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
        views: 52340,
        downloads: 4123,
        likes: 1987,
        image: "https://images.unsplash.com/photo-1563770660941-20978e870e26",
        owner: {
            id: "7b8c9d0e-1f2g3h4i5j6k7l8m9n0o1p2q",
            name: "Quality Control Solutions Ltd",
            avatarUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=QCS",
            type: "organization"
        }
    },
    {
        id: 29,
        name: "Construction Equipment Telematics",
        description: "Telematics data from construction equipment fleet, including location, utilization, and maintenance alerts.",
        industry: "AEC",
        format: "parquet",
        size: 195000,
        updatedAt: Date.now() - 1 * 7 * 24 * 60 * 60 * 1000,
        views: 31240,
        downloads: 2345,
        likes: 987,
        image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece",
        owner: {
            id: "8c9d0e1f-2g3h4i5j6k7l8m9n0o1p2q3r",
            name: "Construction Telematics Solutions Ltd",
            avatarUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=CTS",
            type: "organization"
        }
    },
    {
        id: 30,
        name: "Composite Materials Testing",
        description: "Material testing data for aerospace composites, including mechanical properties and environmental aging effects.",
        industry: "Aerospace",
        format: "csv",
        size: 142000,
        updatedAt: Date.now() - 4 * 24 * 60 * 60 * 1000,
        views: 27650,
        downloads: 1567,
        likes: 678,
        image: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5",
        owner: {
            id: "9d0e1f2g-3h4i5j6k7l8m9n0o1p2q3r4s",
            name: "Aerospace Materials Testing Solutions Ltd",
            avatarUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=AMTS",
            type: "organization"
        }
    },
    {
        id: 31,
        name: "Vehicle Dynamics Testing",
        description: "Vehicle dynamics test data including handling, stability, and ride comfort measurements across various conditions.",
        industry: "Automotive",
        format: "json",
        size: 235000,
        updatedAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
        views: 41230,
        downloads: 3124,
        likes: 1432,
        image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341",
        owner: {
            id: "0e1f2g3h-4i5j6k7l8m9n0o1p2q3r4s5t",
            name: "Automotive Dynamics Testing Solutions Ltd",
            avatarUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=ADTS",
            type: "organization"
        }
    },
    {
        id: 32,
        name: "Electronics Thermal Analysis",
        description: "Thermal performance data from electronic devices under various operating conditions and cooling solutions.",
        industry: "Electronics",
        format: "csv",
        size: 168000,
        updatedAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
        views: 32780,
        downloads: 2123,
        likes: 897,
        image: "https://images.unsplash.com/photo-1563770660941-20978e870e26",
        owner: {
            id: "1f2g3h4i-5j6k7l8m9n0o1p2q3r4s5t6u",
            name: "Electronics Thermal Analysis Solutions Ltd",
            avatarUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=ETAS",
            type: "organization"
        }
    },
    {
        id: 33,
        name: "Renewable Energy Integration",
        description: "Grid integration data for renewable energy sources, including power quality and grid stability metrics.",
        industry: "Energy",
        format: "parquet",
        size: 315000,
        updatedAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
        views: 45670,
        downloads: 3456,
        likes: 1567,
        image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7",
        owner: {
            id: "2g3h4i5j-6k7l8m9n0o1p2q3r4s5t6u7v",
            name: "Renewable Energy Integration Solutions Ltd",
            avatarUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=REIS",
            type: "organization"
        }
    },
    {
        id: 34,
        name: "Marine Vessel Performance",
        description: "Operational data from commercial vessels including fuel consumption, speed, weather conditions, and route optimization metrics.",
        industry: "Marine",
        format: "json",
        size: 42000,
        updatedAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
        views: 8921,
        downloads: 673,
        likes: 289,
        image: "https://images.unsplash.com/photo-1577125305658-dee71d4ee3c3",
        owner: {
            id: "3h4i5j6k-7l8m9n0o1p2q3r4s5t6u7v8w",
            name: "Marine Performance Solutions Ltd",
            avatarUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=MPS",
            type: "organization"
        }
    },
    {
        id: 35,
        name: "Industrial Robot Trajectories",
        description: "Motion capture data from industrial robotic arms performing precision assembly tasks, including joint angles and end-effector positions.",
        industry: "Manufacturing",
        format: "csv",
        size: 28000,
        updatedAt: Date.now() - 1 * 7 * 24 * 60 * 60 * 1000,
        views: 15632,
        downloads: 1205,
        likes: 567,
        image: "https://images.unsplash.com/photo-1565690875712-c08c6d328096",
        owner: {
            id: "4i5j6k7l-8m9n0o1p2q3r4s5t6u7v8w9x",
            name: "Robotics Solutions Ltd",
            avatarUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=RS",
            type: "organization"
        }
    }
];
