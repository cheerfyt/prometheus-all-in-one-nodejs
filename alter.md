## 报警

| 报警名称                    | 条件表达式                                                                               |
|-----------------------------|------------------------------------------------------------------------------------------|
| 进程 CPU 使用率(>80%)       | rate(process_cpu_user_seconds_total{job="validator"}[1m]) * 100 > 80                    |
| 进程内存使用平均使用量(>1G) | avg_over_time(process_resident_memory_bytes{job="validator"}[1m]) > 1024                 |
| 进程内存泄漏风险            | rate(process_resident_memory_bytes{job="validator"}[1h]) > 10                            |
| 新增进程                    | delta(up{job="validator"}[10s]) > 0                                                      |
| 进程退出                    | delta(up{job="validator"}[10s]) < 0                                                      |
| 新增错误数(>0)              | delta(huobi_validator_error_total{job="validator"}[1m]) > 0                              |
| 重放攻击数 (>0)             | delta(huobi_validator_replay_attack_total{job="validator"}[1m]) > 0                      |
| API 慢响应                  | sum(rate(huobi_validator_response_escaped_time_milliseconds{job="validator"}[1m])) > 300 |
| QPS 预警                    | sum(rate(huobi_validator_http_request_total{job="validator"}[1m]))> 50                   |
